<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index()
    {
        $todos = Todo::orderBy('completed')
                     ->orderBy('created_at', 'desc')
                     ->get();
        
        return response()->json($todos);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'priority' => 'sometimes|in:high,medium,low',
        ]);

        $todo = Todo::create(array_merge(
            $validated,
            ['completed' => false]
        ));

        return response()->json($todo, 201);
    }

    public function update(Request $request, Todo $todo)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'completed' => 'sometimes|boolean',
            'priority' => 'sometimes|in:high,medium,low',
        ]);

        $todo->update($validated);
        return response()->json($todo);
    }

    public function destroy(Todo $todo)
    {
        $todo->delete();
        return response()->json(null, 204);
    }
}