<?php

// Copyright (c) ppy Pty Ltd <contact@ppy.sh>. Licensed under the GNU Affero General Public License v3.0.
// See the LICENCE file in the repository root for full licence text.

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PerBeatmapRatings extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('osu_beatmaps', function (Blueprint $table) {
            $table->float('rating')->unsigned()->default(0);
        });

        Schema::create('osu_user_beatmap_ratings', function (Blueprint $table) {
            $table->unsignedMediumInteger('user_id');
            $table->unsignedMediumInteger('beatmap_id');
            $table->unsignedTinyInteger('rating');
            $table->timestamp('date')->useCurrent();

            $table->primary(['user_id', 'beatmap_id']);
            $table->index(['beatmap_id', 'rating'], 'split_ratings');
        });
        $this->setRowFormat('osu_user_beatmap_ratings', 'COMPRESSED');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('osu_user_beatmap_ratings');

        Schema::table('osu_beatmaps', function (Blueprint $table) {
            $table->dropColumn('rating');
        });
    }

    private function setRowFormat($table, $format)
    {
        DB::statement("ALTER TABLE `{$table}` ROW_FORMAT={$format};");
    }
}
