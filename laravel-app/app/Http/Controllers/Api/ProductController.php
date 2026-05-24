<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // ================= GET ALL PRODUCTS =================
    public function index()
    {
        return Product::all();
    }

    // ================= STORE PRODUCT =================
    public function store(Request $request)
    {
        $imagePath = null;

        // UPLOAD IMAGE
        if ($request->hasFile('image')) {

            $imagePath = $request
                ->file('image')
                ->store('products', 'public');
        }

        $product = Product::create([

            'name' => $request->name,
            'category' => $request->category,

            'image' => $imagePath,

            'status' => $request->status,
            'bg_color' => $request->bg_color,

            'price_50' => $request->price_50,
            'stock_50' => $request->stock_50,

            'price_100' => $request->price_100,
            'stock_100' => $request->stock_100,

            'price_250' => $request->price_250,
            'stock_250' => $request->stock_250,
        ]);

        return response()->json([
            'message' => 'Product created successfully',
            'data' => $product
        ]);
    }

    // ================= GET SINGLE PRODUCT =================
    public function show($id)
    {
        $product = Product::findOrFail($id);

        return response()->json($product);
    }

    // ================= UPDATE PRODUCT =================
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        // CHECK IMAGE
        if ($request->hasFile('image')) {

            $imagePath = $request
                ->file('image')
                ->store('products', 'public');

            $product->image = $imagePath;
        }

        $product->update([

            'name' => $request->name,
            'category' => $request->category,

            'status' => $request->status,
            'bg_color' => $request->bg_color,

            'price_50' => $request->price_50,
            'stock_50' => $request->stock_50,

            'price_100' => $request->price_100,
            'stock_100' => $request->stock_100,

            'price_250' => $request->price_250,
            'stock_250' => $request->stock_250,
        ]);

        // SAVE IMAGE IF UPDATED
        if ($request->hasFile('image')) {
            $product->save();
        }

        return response()->json([
            'message' => 'Product updated successfully',
            'data' => $product
        ]);
    }

    // ================= DELETE PRODUCT =================
    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully'
        ]);
    }
}