// thought data component
// by naming the directory ThoughtList and the file index.js, can simply import as ./component/ThoughtList instead of ...ThoughtList/ThoughtList.js
import React from 'react';

// instruct that ThoughtList component will receive thoughts and title props
// destructure argument data to avoid using props.title or props.thoughts in JSX code
const ThoughtList = ({ thoughts, title }) => {
    // if there are no thoughts, return header with info
    if (!thoughts.length) {
        return <h3>No Thoughts Yet</h3>
    }

    // otherwise, return a div with these HTML elements, etc
    return (
        <div>
            <h3>{title}</h3>
            {thoughts &&
            // use map() fn to iterate of thoughts array
            thoughts.map(thought => (
                // key prop helps React track which data needs to be re-rendered if something changes
                // div for single thought by ID
                <div key={thought._id} className="card mb-3">
                    {/* p element for username associated with thought and timestamp */}
                    <p className="card-header">
                        {thought.username}
                        thought on {thought.createdAt}
                    </p>
                    {/* div and p for thought text body */}
                    <div className="card-body">
                        <p>{thought.thoughtText}</p>
                        {/* p for reaction count; if no reactions, display 'start' instead of 'see' */}
                        <p className="mb-0">
                            Reactions: {thought.reactionCount} || Click to{' '}
                            {thought.reactionCount ? 'see' : 'start'} the discussion!
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ThoughtList;