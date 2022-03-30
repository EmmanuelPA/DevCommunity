import {
    LightningElement
} from 'lwc';

export default class CreateAPI extends LightningElement {
    CommunityInfo = [];
    dataShow;
    connectedCallback(){
        this.retrieveData();
        console.log('in');
        
    }

    retrieveData() {

        fetch('https://ap5.salesforce.com/services/data/v53.0/connect/communities', {
            
            headers: {
                /* 'Accept': 'application/json',
                'Content-Type': 'application/json' */
                'Authorization': 'Bearer 00D8c000006fceh!AQUAQJF6fNdy8hUa_MwF_HDvW.CJMZXaqHsFcEQEAYXDkqtcShrT.mmaSFqgvgTP8Gg9PSsGLAa9h9ufR6UNRWbuezZ0we06'
            },
            /* body: {
                'username': 'emmanuel.pecha@mindful-narwhal-dict4p.com',
                'password': 'Emmanuel117CRBXpJZZLKRBzjtUypgBDZa2c',
                'grant_type': 'password',
                'client_id': '3MVG9riCAn8HHkYUDnMXnRKSsFGR0qGGXRKbH8QLQG6G.TRdcPhdRPI5z.fUlEMMpnCem4VV5w9f9EztHzDQw',
                'client_secret': 'FAF914D00FFC211C627D92F5EACB869888054F395ABD3D2C2F613FD4F23572E7'

            } */
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw response;
        }).then(data => {
            console.log(data);
            data.communities.map(element => {
                var siteData = [{
                    ids: element.id,
                    siteUrl: element.siteUrl

                }];
                this.contentData(element.id, element.siteUrl);
               this.CommunityInfo.push(siteData);
            });

        }).catch(error => {
            console.warn(error);
        });
    }

    contentData(id, site) {
        var s = site;
        fetch(`https://ap5.salesforce.com/services/data/v53.0/connect/communities/${id}/managed-content/delivery`, {
            
            headers: {

                'Authorization': 'Bearer 00D8c000006fceh!AQUAQJF6fNdy8hUa_MwF_HDvW.CJMZXaqHsFcEQEAYXDkqtcShrT.mmaSFqgvgTP8Gg9PSsGLAa9h9ufR6UNRWbuezZ0we06'
            },

        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw response;
        }).then(data => {
            data.items.map(element => {
                console.log(element);
                var jsonContent = {
                    "contentKey": "MCN3TTGCATKRDNBGXVYGI6ADOHAA",
                    "urlName": "test",
                    "type": "cms_image",
                    "body": {
                      "source": {
                        "url": "https://images3.alphacoders.com/704/thumb-1920-704387.png"
                      },
                      "title": "Test"
                    }
                  }
                  var newData =JSON.stringify(jsonContent);
                  this.dataShow = newData;
                  console.log(newData);
            });
        }).catch(error => {
            console.warn(error);
        });
    }
}