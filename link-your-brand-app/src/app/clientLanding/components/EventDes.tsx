"use client";

type propTypes ={
    description: string;
}

export default function EventDes({ description } : propTypes){

    return(
        <div>
            <p className="pagePanel">{description}</p>
        </div>
    );
}