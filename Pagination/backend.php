
<?php

public function filter2(Request $request)
{
    $query = VoterDetail::query();

    // Search
    if ($request->search) {
        $query->where(function($q) use ($request) {
            $q->where('voter_id_no', 'like', '%' . $request->search . '%')
              ->orWhere('e_name', 'like', '%' . $request->search . '%')
              ->orWhere('t_name', 'like', '%' . $request->search . '%');
        });
    }

    // part no
    if ($request->part_no) {
        $query->where('part_no', $request->part_no);
    }

    // section no
    if ($request->section_no) {
        $query->where('section_no', $request->section_no);
    }

    // status
    if ($request->filled('status')) {
        $query->where('status', $request->status);
    }

    // Pagination
    $perPage = $request->input('per_page', 10);
    $result = $query->orderBy('e_name')->paginate($perPage);

    return response()->json($result);
}
