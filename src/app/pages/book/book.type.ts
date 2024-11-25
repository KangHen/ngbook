export type Book = {
    id: number;
    name: string;
    category_id: number;
    created_at: string;
    updated_at?: string;
}

export type Categories = {
    [key: number]: string;
}

export type CategoriesResponse = {
    message: string;
    data: Categories;
}

export type BookForm = {
    name: string;
    category_id: number;
}

export type BooksResponse = {
    message: string;
    data: Book[];
}

export type BookResponse = {
    message: string;
    data: Book;
}

export type SuccessResponse = {
    message: string;
    success: boolean;
}