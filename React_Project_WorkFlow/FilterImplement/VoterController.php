
<?
// Route::get('/voters', [VoterDetialsController::class, 'filter']);


public function filter(Request $request)
{
    $query = VoterDetail::query();

    // Search by voter_id or name (English/Tamil)
    if ($request->search) {
        $query->where(function($q) use ($request) {
            $q->where('voter_id_no', 'like', '%' . $request->search . '%')
              ->orWhere('e_name', 'like', '%' . $request->search . '%')
              ->orWhere('t_name', 'like', '%' . $request->search . '%');
        });
    }

    // Filter by part_no (location)
    if ($request->part_no) {
        $query->where('part_no', $request->part_no);
    }

    // Filter by section_no (street)
    if ($request->section_no) {
        $query->where('section_no', $request->section_no);
    }

    // Filter by status (visited / not visited)
    if ($request->filled('status')) {
        $query->where('status', $request->status);
    }

    return response()->json([
        'data' => $query->orderBy('e_name')->get()
    ]);
}



// Request Example (Frontend will send like this)

// GET /voters?search=vignesh&part_no=6&section_no=2&status=1