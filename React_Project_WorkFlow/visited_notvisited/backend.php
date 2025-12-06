<?php

// Update Status visited or not visited
class VoterDetialsController extends Controller
{

public function updatestatus(Request $request, $id){

        $request->validate([
            'status'=>"required|in:0,1",
        ]);

        $voter =VoterDetail::find($id);

        if(!$voter){
            return response()->json(["erro"=>"Voter Id is not found"],404);

        }

           $voter->update([
                'status' => $request->status
          ]);


    return response()->json([
        'message' => 'Status updated successfully',
        'voter' => $voter
    ]);

}

}
