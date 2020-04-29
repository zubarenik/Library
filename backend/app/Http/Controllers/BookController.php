<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Book;

class BookController extends Controller
{
    public function add(Request $request)
    {
        $title = $request->title;
        $author = $request->author;
        $book = new Book;
        $book->title = $title;
        $book->author = $author;
        $book->availability = true;
        $book->save();
        return $book->id;
    }
    public function all(Request $request)
    {
        return Book::all();
    }
    public function delete($id)
    {
        $book = Book::findOrFail($id);
        $book->delete();
        return true;
    }
    public function changeAvailability($id)
    {
        $book = Book::findOrFail($id);
        $book->availability = !$book->availability;
        $book->save();
        return true;
    }
}
