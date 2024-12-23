import { Suspense } from 'react';
import {
    defer,
    json,
    redirect,
    useRouteLoaderData,
    Await,
} from 'react-router-dom';
import EventItem from './EventItem';
import EventsList from './EventsList';

const EventDetailPage = () => {
    const { event, events } = useRouteLoaderData('event-detail');
    return (
        <>
            <Suspense
                fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}
            >
                <Await resolve={event}>
                    {(loadedevent) => <EventItem event={loadedevent} />}
                </Await>
            </Suspense>
            <Suspense
                fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}
            >
                <Await resolve={events}>
                    {(loadedEvents) => <EventsList events={loadedEvents} />}
                </Await>
            </Suspense>
        </>
    );
};

export default EventDetailPage;

async function loadEvent(id) {
    const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/events/${id}`
    );

    if (!response.ok) {
        throw json(
            { message: 'Could not fetch details for selected event.' },
            {
                status: 500,
            }
        );
    } else {
        const resData = await response.json();
        return resData.event;
    }
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

export async function loader({ params }) {
    const id = params.eventId;

    return defer({
        event: await loadEvent(id),
        events: loadEvents(),
    });
}

export async function action({ request, params }) {
    const eventId = params.eventId;
    console.log('event Id: ', eventId);
    const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/events/${eventId}`,
        {
            method: request.method,
        }
    );

    console.log('response: ', response);

    if (!response.ok) {
        throw json({ message: 'Could not delete event.' }, { status: 500 });
    }

    return redirect('/events');
}
