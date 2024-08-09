// Interfaz que define la estructura de un post
export interface Ipost {
    id: number; // Identificador único del post, generalmente un número generado automáticamente
    title: string; // Título del post
    description: string; // Descripción breve del post
    body: string; // Cuerpo del post, que puede contener el contenido principal
    multimediaUrl: string; // URL de un recurso multimedia asociado con el post, como una imagen o video
    date: string; // Fecha estimada de publicación del post en formato de cadena (p.ej., "2024-08-09")
    creationDate: string; // Fecha de creación del post en formato de cadena (p.ej., "2024-08-08")
}
