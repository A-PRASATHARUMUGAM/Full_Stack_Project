
<?php

public function filter2(Request $request){

    $query = VoterDetail::query();

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

    //Filter by Gender (Male / Female )
    if($request->gender){
        $query->where('gender',$request->gender);
    }

    $perPage = $request->per_page ?? 10;

    return response()->json(
        $query->orderBy('id', 'desc')->paginate($perPage)
    );
}
