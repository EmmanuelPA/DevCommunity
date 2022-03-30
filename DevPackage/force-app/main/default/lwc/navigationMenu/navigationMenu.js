import { LightningElement, api, wire } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';
import getNavigationMenuItems from '@salesforce/apex/NavigationMenuItemsController.getNavigationMenuItems';
import isGuestUser from '@salesforce/user/isGuest';
import basePath from '@salesforce/community/basePath';

export default class NavigationMenu extends NavigationMixin(LightningElement) {
    @api buttonLabel;
    @api buttonRedirectPageAPIName;
    @api menuName;
    guestUser = isGuestUser;
    error;
    href = basePath;
    isLoaded;
    menuItems = [];
    publishedState;
    showHamburgerMenu;
    chosen;
    urlPath;

    @wire(getNavigationMenuItems, {
        menuName: '$menuName',
        publishedState: '$publishedState'
    })
    wiredMenuItems({ error, data }) {
        console.log(this.guestUser);
        if (data && !this.isLoaded) {
            this.menuItems = data
                .map((item, index) => {
                    return {
                        target: item.Target,
                        id: index,
                        label: item.Label,
                        defaultListViewId: item.DefaultListViewId,
                        type: item.Type,
                        accessRestriction: item.AccessRestriction
                    };
                })
                .filter((item) => {
                    // Only show "Public" items if guest user
                    
                    return (
                        item.accessRestriction === 'None' ||
                        (item.accessRestriction === 'LoginRequired' &&
                            !isGuestUser)
                    );
                });
            this.error = undefined;
            this.isLoaded = true;
        } else if (error) {
            this.error = error;
            this.menuItems = [];
            this.isLoaded = true;
            console.log(`Navigation menu error: ${JSON.stringify(this.error)}`);
        }
    }

    @wire(CurrentPageReference)
    setCurrentPageReference(currentPageReference) {
        const app =
            currentPageReference &&
            currentPageReference.state &&
            currentPageReference.state.app;
        if (app === 'commeditor') {
            this.publishedState = 'Draft';
        } else {
            this.publishedState = 'Live';
        }
    }
    get isGuestUserMethod(){
        return this.guestUser;
    }

    handleClick() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: this.buttonRedirectPageAPIName
            }
        });
        this.showHamburgerMenu = false;
    }

    handleHamburgerMenuToggle(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        if (this.showHamburgerMenu) {
            this.showHamburgerMenu = false;
        } else {
            this.showHamburgerMenu = true;
        }
    }
    callFromChild(event){
        this.showHamburgerMenu = event.detail.closeModal;
        console.log(JSON.stringify(event.detail));
    }

    get logoutLink() {
        const sitePrefix = basePath.replace(/\/s$/i, ""); // site prefix is the site base path without the trailing "/s"
        return sitePrefix + '/secur/logout.jsp';
    }

}