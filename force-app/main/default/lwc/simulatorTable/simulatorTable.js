import {LightningElement, api, track} from 'lwc';
const INTEREST = 0.0133;

export default class GetPicklistValuesOfField extends LightningElement {
    @api totalAmount;
    @api term;
    @api downPayment = 0;
    @track payment = [];
    showTable = false;
    @track tablePDF;
    @api
    calculateMonthlyPayment() {
        this.payment = [];
        var remaining = this.totalAmount - this.downPayment;
        console.log('this is remaining', remaining);
        var monthly = remaining / this.term;
        for (var i = 0; i < this.term; i++) {
            var autoInterest = remaining * INTEREST;
            var total = (monthly + autoInterest) * 1.15;
            //var totalMonthly = monthly - autoInterest;
            var tableDta = {
                paymentId: i + 1,
                remaining: remaining.toFixed(2),
                payment: monthly.toFixed(2),
                interest: autoInterest.toFixed(2),
                total: total.toFixed(2)
            }
            remaining = remaining - monthly;
            this.payment.push(tableDta);

        }
        if (this.payment.length > 0) {
            this.showTable = true;
        }
    }
    createCSV() {
        const header = [
            ["# Pay", "Unpaid Auto Balance", "Monthly Auto Capital Payment", "Monthly Payment Of Auto Interest", "Total Payment with VAT"]
        ];
        let csvContent = header.map(e => e.join(",")).join("\n");

        let csv = csvContent;
        this.payment.map(obj => {
            let row = [];

            var key = 'paymentId'
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    row.push(obj[key]);
                }
            }

            csv += "\n" + row.join(',');
            
        });
        let csvData = new Blob([csv], {
            type: 'text/csv'
        });
        let csvUrl = URL.createObjectURL(csvData);

        let hiddenElement = document.createElement('a');
        hiddenElement.href = csvUrl;
        hiddenElement.target = '_blank';
        hiddenElement.download = 'name' + '.csv';
        hiddenElement.click();
    }

    createPDF() {

        const header = [
            "# Pay", "Unpaid Auto Balance", "Monthly Capital Payment", "Monthly Auto Interest", "Total With VAT"
        ];

        var style = "<style>";
        style = style + "table {width: 100%;font: 17px Calibri;}";
        style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
        style = style + "padding: 2px 3px;text-align: center; border: 1px solid black;}";
        style = style + "</style>";

        
        var win = window.open('', '', 'height=700,width=700');

        win.document.write('<html><head>');
        win.document.write('<title>Car Detailed Payment</title>');   
        win.document.write(style);          
        win.document.write('</head>');
        win.document.write('<body>');
        win.document.write('<table>');
        win.document.write('<thead> <tr>');
        header.map(e => {
            
            win.document.write('<th>' + e + '</th>');
        });
        win.document.write('</tr></thead> <tbody>');
        this.payment.map(e => {
            win.document.write('<tr>');
            win.document.write('<th>' + e.paymentId + '</th>');
            win.document.write('<th>' + e.remaining + '</th>');
            win.document.write('<th>' + e.payment + '</th>');
            win.document.write('<th>' + e.interest + '</th>');
            win.document.write('<th>' + e.total + '</th>');
            win.document.write('</tr>');
        });
        win.document.write('</tbody>');

        win.document.write('</table>');

        win.document.write('</body></html>');

        win.document.close(); 

        win.print();    
    }
}