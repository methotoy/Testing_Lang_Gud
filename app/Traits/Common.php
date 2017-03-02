<?php

namespace App\Traits;

use Carbon\Carbon;

trait Common {

	public function formatDate( $date, $format ) {
		return Carbon::parse($date)->format($format);
	}

}