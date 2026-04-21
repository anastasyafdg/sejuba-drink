<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Penjual extends Model
{
    protected $table = 'penjual';
    protected $primaryKey = 'id_penjual';

    protected $fillable = [
        'nama_penjual',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
    ];
}