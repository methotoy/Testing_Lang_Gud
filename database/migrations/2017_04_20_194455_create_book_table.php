<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBookTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->string('author');
            $table->string('edition')->nullable();
            $table->integer('pages')->unsigned();
            $table->integer('year')->unsigned();
            $table->integer('category');
            $table->date('date_received')->nullable();
            $table->string('class')->nullable();
            $table->integer('volume')->unsigned();
            $table->string('source_of_fund')->nullable();
            $table->float('cost_price', 5, 2)->unsigned();
            $table->string('publisher')->nullable();
            $table->string('remarks')->nullable();
            $table->boolean('available')->default(1);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('books');
    }
}
