import {createBrowserRouter, RouterProvider} from "react-router-dom";

import PageTitle from "@/components/page-title.tsx";
import {t} from "i18next";

import Error404 from "@/pages/404";
import Error500 from "@/pages/500";

import Index from "@/pages/index";
import Login from "@/pages/login";
import Logout from "@/pages/logout";

import ManageLayout from "@/pages/manage/_layout.tsx";
import ManageOverview from "@/pages/manage/overview";
import ManageMachines from "@/pages/manage/machines";
import ManageNodes from "@/pages/manage/nodes";

import ManageSettingsLayout from "@/pages/manage/settings/_layout.tsx";
import ManageSettingsAccount from "@/pages/manage/settings/account.tsx";
import ManageSettingsAppearance from "@/pages/manage/settings/appearance.tsx";
import ManageSettingsNotifications from "@/pages/manage/settings/notifications.tsx";

function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <>
        <PageTitle title={t('page.index')}/>
        <Index/>
      </>,
      errorElement: <Error500/>,
    },
    {
      path: "/login",
      element: <>
        <PageTitle title={t('page.login')}/>
        <Login/>
      </>,
      errorElement: <Error500/>,
    },
    {
      path: "/logout",
      element: <Logout/>,
      errorElement: <Error500/>,
    },
    {
      path: "/manage",
      element: <ManageLayout/>,
      children: [
        {
          path: "",
          element: <>
            <PageTitle title={t('page.manage.overview')}/>
            <ManageOverview/>
          </>,
        },
        {
          path: "machines",
          element: <>
            <PageTitle title={t('page.manage.machines')}/>
            <ManageMachines/>
          </>,
        },
        {
          path: "nodes",
          element: <>
            <PageTitle title={t('page.manage.nodes')}/>
            <ManageNodes/>
          </>,
        },
        {
          path: "settings",
          element: <ManageSettingsLayout/>,
          children: [
            {
              path: "",
              element: <>
                <PageTitle title={t('page.manage.settings.account')}/>
                <ManageSettingsAccount/>
              </>,
            },
            {
              path: "appearance",
              element: <>
                <PageTitle title={t('page.manage.settings.appearance')}/>
                <ManageSettingsAppearance/>
              </>,
            },
            {
              path: "notifications",
              element: <>
                <PageTitle title={t('page.manage.settings.notifications')}/>
                <ManageSettingsNotifications/>
              </>,
            },
          ]
        },
      ],
    },
    {
      path: "*",
      element: <>
        <PageTitle title={t('page.error404')}/>
        <Error404/>
      </>,
    },
  ]);
  return <RouterProvider router={router}/>;
}

export default Routes;
