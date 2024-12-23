import {
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Route,
} from 'react-router-dom';
import HomePage from './components/HomePage';
import EventsPage, { loader as eventsLoader } from './components/EventsPage';
import EventDetailPage, {
    loader as eventDetailLoader,
    action as deleteEventAction,
} from './components/EventDetailPage';
import NewEventPage from './components/NewEventPage';
import EditEventPage from './components/EditEventPage';
import RootLayout from './pages/RootLayout';
import EventsRootLayout from './pages/EventsRootLayout';
import ErrorPage from './pages/Error';
import { action as handleEventAction } from './components/EventForm';
import NewsletterPage, {
    action as newsletterAction,
} from './components/Newsletter';

// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

const routeDefinitions = createRoutesFromElements(
    <Route path='/' element={<RootLayout />} errorElement={<ErrorPage />}>
        <Route index={true} element={<HomePage />} />
        <Route path='events' element={<EventsRootLayout />}>
            <Route
                index={true}
                element={<EventsPage />}
                loader={eventsLoader}
            />
            <Route path=':eventId' id='event-detail' loader={eventDetailLoader}>
                <Route
                    index={true}
                    element={<EventDetailPage />}
                    action={deleteEventAction}
                />
                <Route
                    path='edit'
                    element={<EditEventPage />}
                    action={handleEventAction}
                />
            </Route>
            <Route
                path='new'
                element={<NewEventPage />}
                action={handleEventAction}
            />
        </Route>
        <Route
            path='newsletter'
            element={<NewsletterPage />}
            action={newsletterAction}
        />
    </Route>
);

const router = createBrowserRouter(routeDefinitions);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
