import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import Root, { loader as rootLoader, action as rootAction } from "./pages/root";
import Error from "./pages/Error"
import Contact, {loader as contactLoader, action as contactAction,} from "./pages/Contact"
import EditContact, {action as editAction} from "./pages/edit"
import { action as destroyAction } from "./pages/destroy";
import Index from "./pages/index";
import App from './App';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    loader: rootLoader,
    action: rootAction,
    errorElement: <Error />,
    children: [
      {
        errorElement: <Error />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
        {
          path: "contacts/:contactId/edit",
          element: <EditContact />,
          loader: contactLoader, 
          action: editAction,
        },
        {
          path: "contacts/:contactId/destroy",
          action: destroyAction,
          errorElement: <div>Oops! There was an error.</div>,
        },
      ],
    }
  ],
  },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


