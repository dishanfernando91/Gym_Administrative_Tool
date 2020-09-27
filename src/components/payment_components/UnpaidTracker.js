import React from 'react'

export default function UnpaidTracker({member}) {
    return (
        <div className="pyt-pending-entry">
            <p style={ {color: "red"} }>ID - {member.name}</p>
        </div>
    )
}
