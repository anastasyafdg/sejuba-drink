<?php

namespace App\Models;

use Database\Factories\PembeliFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Pembeli extends Authenticatable
{
    /** @use HasFactory<PembeliFactory> */
    use HasFactory, Notifiable;

    protected $table = 'pembeli';

    protected $primaryKey = 'id_pembeli';

    protected $fillable = [
        'nama_pembeli',
        'email',
        'no_telepon',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
        ];
    }

    public function pesanan()
    {
        return $this->hasMany(
            Pesanan::class,
            'id_pembeli',
            'id_pembeli'
        );
    }
}
