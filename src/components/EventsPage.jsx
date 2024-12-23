import { Suspense } from 'react';
import { Await, defer, json, useLoaderData } from 'react-router-dom';

import EventsList from './EventsList';

function EventsPage() {
    const { events } = useLoaderData();

    return (
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={events}>
                {(loadedEvents) => <EventsList events={loadedEvents} />}
            </Await>
        </Suspense>
    );
}

async function loadEvents() {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/events`);
    if (!response.ok) {
        // return { isError: true, message: 'Could not fetch events. '};
        // throw new Response(JSON.stringify({ message: 'Could not fetch events'}), { status: 500,});
        throw json({ message: 'Could not fetch events' }, { status: 500 });
    } else {
        const resData = await response.json();
        return resData.events;
    }
}

export function loader() {
    return defer({
        events: loadEvents(),
    });
}

export default EventsPage;
