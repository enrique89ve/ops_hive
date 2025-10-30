import { toPng, toJpeg } from "html-to-image";

/**
 * Formato de imagen soportado
 */
export enum ImageFormat {
  PNG = "png",
  JPEG = "jpeg",
}

/**
 * Configuración para la captura de imágenes
 */
interface CaptureConfig {
  readonly targetWidth: number;
  readonly aspectRatio: {
    readonly width: number;
    readonly height: number;
  };
  readonly quality: number;
  readonly format?: ImageFormat;
  readonly backgroundColor?: string;
}

/**
 * Resultado de la captura de imagen
 */
interface CaptureResult {
  readonly blob: Blob;
  readonly dataUrl: string;
  readonly width: number;
  readonly height: number;
}

/**
 * Opciones para copiar al portapapeles
 */
interface ClipboardCopyOptions {
  readonly fallbackToDownload?: boolean;
  readonly onUnsupported?: () => void;
}

/**
 * Resultado de la operación de compartir
 */
enum ShareResultType {
  Success = "success",
  Fallback = "fallback",
  Unsupported = "unsupported",
  Error = "error",
}

interface ShareResult {
  readonly type: ShareResultType;
  readonly message: string;
}

/**
 * Configuración por defecto para capturas de redes sociales
 */
const DEFAULT_CONFIG: CaptureConfig = {
  targetWidth: 1080,
  aspectRatio: {
    width: 4,
    height: 5,
  },
  quality: 0.95,
  format: ImageFormat.JPEG,
  backgroundColor: "#000000",
} as const;

/**
 * Detecta si el navegador soporta la API de Clipboard moderna
 */
function supportsClipboardAPI(): boolean {
  return (
    typeof navigator !== "undefined" &&
    "clipboard" in navigator &&
    "write" in navigator.clipboard &&
    typeof ClipboardItem !== "undefined"
  );
}

/**
 * Detecta si el navegador soporta la API de compartir nativa
 */
function supportsNativeShare(): boolean {
  return (
    typeof navigator !== "undefined" &&
    "share" in navigator &&
    "canShare" in navigator
  );
}

/**
 * Captura un elemento HTML como imagen (PNG o JPEG)
 * @param element - El elemento HTML a capturar
 * @param config - Configuración opcional para la captura
 * @returns Promise con el resultado de la captura
 */
export async function captureElementAsImage(
  element: HTMLElement,
  config: Partial<CaptureConfig> = {}
): Promise<CaptureResult> {
  const finalConfig: CaptureConfig = {
    ...DEFAULT_CONFIG,
    ...config,
  };

  try {
    // Obtener dimensiones actuales del elemento
    const rect = element.getBoundingClientRect();

    if (rect.width === 0 || rect.height === 0) {
      throw new Error("El elemento tiene dimensiones inválidas");
    }

    // Calcular dimensiones objetivo
    const { targetWidth, aspectRatio, quality, format, backgroundColor } = finalConfig;
    const targetHeight = Math.round(
      targetWidth * (aspectRatio.height / aspectRatio.width)
    );

    // Calcular el factor de escala
    const scale = targetWidth / rect.width;

    // Configuración común para la captura
    const captureOptions = {
      quality,
      pixelRatio: scale,
      width: rect.width,
      height: rect.height,
      cacheBust: true,
      backgroundColor: backgroundColor || "#000000",
      style: {
        transform: "scale(1)",
        transformOrigin: "top left",
      },
      // Filtrar elementos que podrían causar problemas
      filter: (node: Node) => {
        // Excluir elementos con atributos data-no-capture
        if (node instanceof Element) {
          return !node.hasAttribute("data-no-capture");
        }
        return true;
      },
    };

    // Capturar la imagen según el formato
    const captureFunction = format === ImageFormat.JPEG ? toJpeg : toPng;
    const dataUrl = await captureFunction(element, captureOptions);

    // Convertir dataUrl a blob
    const response = await fetch(dataUrl);
    const blob = await response.blob();

    // Validar que el blob no esté vacío
    if (blob.size === 0) {
      throw new Error("La imagen capturada está vacía");
    }

    return {
      blob,
      dataUrl,
      width: targetWidth,
      height: targetHeight,
    };
  } catch (error) {
    console.error("Error al capturar imagen:", error);
    throw new Error(
      `No se pudo capturar la imagen: ${error instanceof Error ? error.message : "Error desconocido"}`
    );
  }
}

/**
 * Copia una imagen al portapapeles del sistema
 * @param blob - Blob de la imagen a copiar
 * @param options - Opciones adicionales
 * @returns Promise con el resultado de la operación
 */
export async function copyImageToClipboard(
  blob: Blob,
  options: ClipboardCopyOptions = {}
): Promise<ShareResult> {
  const { fallbackToDownload = false, onUnsupported } = options;

  // Verificar soporte de la API
  if (!supportsClipboardAPI()) {
    if (onUnsupported) {
      onUnsupported();
    }

    if (fallbackToDownload) {
      return {
        type: ShareResultType.Unsupported,
        message:
          "Tu navegador no soporta copiar imágenes. Intenta descargar la imagen.",
      };
    }

    return {
      type: ShareResultType.Unsupported,
      message: "Tu navegador no soporta la función de copiar al portapapeles",
    };
  }

  try {
    // Crear ClipboardItem con el blob
    const clipboardItem = new ClipboardItem({
      [blob.type]: blob,
    });

    // Escribir al portapapeles
    await navigator.clipboard.write([clipboardItem]);

    return {
      type: ShareResultType.Success,
      message: "Imagen copiada al portapapeles exitosamente",
    };
  } catch (error) {
    console.error("Error al copiar al portapapeles:", error);

    // Intentar con permisos explícitos en algunos navegadores
    try {
      const permission = await navigator.permissions.query({
        name: "clipboard-write" as PermissionName,
      });

      if (permission.state === "denied") {
        return {
          type: ShareResultType.Error,
          message: "Permiso de portapapeles denegado. Revisa la configuración de tu navegador.",
        };
      }
    } catch (permError) {
      // Ignorar errores de permisos en navegadores que no los soportan
    }

    return {
      type: ShareResultType.Error,
      message: `Error al copiar: ${error instanceof Error ? error.message : "Error desconocido"}`,
    };
  }
}

/**
 * Descarga una imagen al dispositivo del usuario
 * @param blob - Blob de la imagen a descargar
 * @param filename - Nombre del archivo (sin extensión)
 * @param format - Formato de imagen (PNG o JPEG)
 * @returns Promise con el resultado de la operación
 */
export async function downloadImage(
  blob: Blob,
  filename: string = "image",
  format: ImageFormat = ImageFormat.JPEG
): Promise<ShareResult> {
  try {
    // Crear URL temporal
    const url = URL.createObjectURL(blob);

    // Crear elemento de descarga
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.${format}`;

    // Agregar al DOM temporalmente para compatibilidad con Safari
    link.style.display = "none";
    document.body.appendChild(link);

    // Disparar descarga
    link.click();

    // Limpiar
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);

    return {
      type: ShareResultType.Success,
      message: "Imagen descargada exitosamente",
    };
  } catch (error) {
    console.error("Error al descargar imagen:", error);
    return {
      type: ShareResultType.Error,
      message: `Error al descargar: ${error instanceof Error ? error.message : "Error desconocido"}`,
    };
  }
}

/**
 * Comparte una imagen usando la API nativa de compartir (principalmente móvil)
 * @param blob - Blob de la imagen a compartir
 * @param options - Opciones adicionales para compartir
 * @returns Promise con el resultado de la operación
 */
export async function shareImageNative(
  blob: Blob,
  options: {
    readonly title?: string;
    readonly text?: string;
    readonly filename?: string;
  } = {}
): Promise<ShareResult> {
  const { title = "Compartir imagen", text = "", filename = "image.png" } = options;

  // Verificar soporte
  if (!supportsNativeShare()) {
    return {
      type: ShareResultType.Unsupported,
      message: "Tu navegador no soporta la función de compartir nativa",
    };
  }

  try {
    // Crear archivo para compartir
    const file = new File([blob], filename, { type: blob.type });

    // Verificar si se puede compartir el archivo
    if (!navigator.canShare({ files: [file] })) {
      return {
        type: ShareResultType.Unsupported,
        message: "Tu dispositivo no puede compartir este tipo de archivo",
      };
    }

    // Compartir
    await navigator.share({
      files: [file],
      title,
      text,
    });

    return {
      type: ShareResultType.Success,
      message: "Imagen compartida exitosamente",
    };
  } catch (error) {
    // El usuario canceló el compartir
    if (error instanceof Error && error.name === "AbortError") {
      return {
        type: ShareResultType.Fallback,
        message: "Compartir cancelado por el usuario",
      };
    }

    console.error("Error al compartir:", error);
    return {
      type: ShareResultType.Error,
      message: `Error al compartir: ${error instanceof Error ? error.message : "Error desconocido"}`,
    };
  }
}

/**
 * Estrategia inteligente de compartir que intenta múltiples métodos
 * @param element - Elemento HTML a capturar
 * @param options - Opciones de configuración
 * @returns Promise con el resultado de la operación
 */
export async function smartShare(
  element: HTMLElement,
  options: {
    readonly filename?: string;
    readonly preferNativeShare?: boolean;
    readonly config?: Partial<CaptureConfig>;
  } = {}
): Promise<ShareResult> {
  const { filename = "image", preferNativeShare = false, config } = options;

  try {
    // Capturar imagen
    const capture = await captureElementAsImage(element, config);

    // Si prefiere compartir nativo y está disponible
    if (preferNativeShare && supportsNativeShare()) {
      const result = await shareImageNative(capture.blob, {
        filename: `${filename}.png`,
      });

      // Si falló, intentar copiar al portapapeles
      if (result.type === ShareResultType.Error) {
        return await copyImageToClipboard(capture.blob);
      }

      return result;
    }

    // Por defecto, intentar copiar al portapapeles
    const copyResult = await copyImageToClipboard(capture.blob);

    // Si no se pudo copiar, descargar
    if (copyResult.type !== ShareResultType.Success) {
      return await downloadImage(capture.blob, filename);
    }

    return copyResult;
  } catch (error) {
    console.error("Error en smartShare:", error);
    return {
      type: ShareResultType.Error,
      message: `Error al procesar la imagen: ${error instanceof Error ? error.message : "Error desconocido"}`,
    };
  }
}

/**
 * Información sobre las capacidades del navegador
 */
export interface BrowserCapabilities {
  readonly clipboard: boolean;
  readonly nativeShare: boolean;
  readonly download: boolean;
}

/**
 * Obtiene las capacidades del navegador actual
 * @returns Objeto con las capacidades soportadas
 */
export function getBrowserCapabilities(): BrowserCapabilities {
  return {
    clipboard: supportsClipboardAPI(),
    nativeShare: supportsNativeShare(),
    download: true, // Siempre disponible
  };
}
