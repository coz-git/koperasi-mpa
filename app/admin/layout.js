'use client';

import React, { useContext, useEffect, useRef } from 'react';
import { useEventListener, useUnmountEffect } from 'primereact/hooks';
import { useRouter } from 'next/navigation';
import { classNames, DomHandler } from 'primereact/utils';
import { LayoutContext } from '../../context/layoutcontext';
import PrimeReact from 'primereact/api';
import AppSidebar from '../../components/SideBar';
import AppTopbar from '../../components/TopBar';

const layout = ({ children }) => {
    const { layoutConfig, layoutState, setLayoutState } =
        useContext(LayoutContext);

    const topbarRef = useRef(null);
    const sidebarRef = useRef(null);

    const router = useRouter();
    const [bindMenuOutsideClickListener, unbindMenuOutsideClickListener] =
        useEventListener({
            type: 'click',
            listener: (event) => {
                const isOutsideClicked = !(
                    sidebarRef.current.isSameNode(event.target) ||
                    sidebarRef.current.contains(event.target) ||
                    topbarRef.current.menubutton.isSameNode(event.target) ||
                    topbarRef.current.menubutton.contains(event.target)
                );

                if (isOutsideClicked) {
                    hideMenu();
                }
            },
        });

    const [
        bindProfileMenuOutsideClickListener,
        unbindProfileMenuOutsideClickListener,
    ] = useEventListener({
        type: 'click',
        listener: (event) => {
            const isOutsideClicked = !(
                topbarRef.current.topbarmenu.isSameNode(event.target) ||
                topbarRef.current.topbarmenu.contains(event.target) ||
                topbarRef.current.topbarmenubutton.isSameNode(event.target) ||
                topbarRef.current.topbarmenubutton.contains(event.target)
            );

            if (isOutsideClicked) {
                hideProfileMenu();
            }
        },
    });

    const hideMenu = () => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            overlayMenuActive: false,
            staticMenuMobileActive: false,
            menuHoverActive: false,
        }));
        unbindMenuOutsideClickListener();
        unblockBodyScroll();
    };

    const hideProfileMenu = () => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            profileSidebarVisible: false,
        }));
        unbindProfileMenuOutsideClickListener();
    };

    const blockBodyScroll = () => {
        DomHandler.addClass('blocked-scroll');
    };

    const unblockBodyScroll = () => {
        DomHandler.removeClass('blocked-scroll');
    };

    useEffect(() => {
        if (
            layoutState.overlayMenuActive ||
            layoutState.staticMenuMobileActive
        ) {
            bindMenuOutsideClickListener();
        }

        layoutState.staticMenuMobileActive && blockBodyScroll();
    }, [layoutState.overlayMenuActive, layoutState.staticMenuMobileActive]);

    useEffect(() => {
        if (layoutState.profileSidebarVisible) {
            bindProfileMenuOutsideClickListener();
        }
    }, [layoutState.profileSidebarVisible]);

    // useEffect(() => {
    //     router.ready(() => {
    //         router.events.on('routeChangeComplete', () => {
    //             hideMenu();
    //             hideProfileMenu();
    //         });
    //     });
    //     // router.events.on('routeChangeStart', handleRouteChange);
    // }, []);

    PrimeReact.ripple = true;

    useUnmountEffect(() => {
        unbindMenuOutsideClickListener();
        unbindProfileMenuOutsideClickListener();
    });

    const containerClass = classNames('layout-wrapper', {
        'layout-theme-light': layoutConfig.colorScheme === 'light',
        'layout-theme-dark': layoutConfig.colorScheme === 'dark',
        'layout-overlay': layoutConfig.menuMode === 'overlay',
        'layout-static': layoutConfig.menuMode === 'static',
        'layout-static-inactive':
            layoutState.staticMenuDesktopInactive &&
            layoutConfig.menuMode === 'static',
        'layout-overlay-active': layoutState.overlayMenuActive,
        'layout-mobile-active': layoutState.staticMenuMobileActive,
        'p-input-filled': layoutConfig.inputStyle === 'filled',
        'p-ripple-disabled': !layoutConfig.ripple,
    });

    return (
        <div className={containerClass}>
            <AppTopbar ref={topbarRef} />
            <div ref={sidebarRef} className="layout-sidebar">
                <AppSidebar />
            </div>
            <div className="layout-main-container">
                <div className="layout-main">{children}</div>
                {/* <AppFooter /> */}
            </div>
            <div className="layout-mask"></div>
        </div>
    );
};

export default layout;
