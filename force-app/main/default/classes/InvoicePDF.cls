public class InvoicePDF {
    public Account account {get; set;}
    
    public List<Opportunity> OppList {get; set;}

    
    public InvoicePDF(){
        String accountId = ApexPages.currentPage().getParameters().get('accountId');
        this.account = [SELECT id, Name, BillingStreet, BillingCity, BillingState,
                       BillingPostalCode, BillingCountry
                       FROM Account
                       WHERE id = :accountId
                       ];
        this.OppList=[Select Name, Amount, CloseDate
                        FROM opportunity
                        WHERE AccountId = :this.account.id
                        ];
      
        
        
    }
    
    @InvocableMethod(label='Email Invoice PDF' description='Generates And Emails an Invoice PDF')
    public static void generatePDF(List<List<String>> args){
        List<String> nested = args[0];
        String email = nested[0];    
        String recordId = nested[1];
        
        PageReference invoicePDF = new PageReference('/apex/InvoicePDFPage?accountId='+ recordId);
        Messaging.EmailFileAttachment attachment = new Messaging.EmailFileAttachment();
        attachment.setContentType('application/pdf');
        attachment.setFileName('Invoice PDF');
        attachment.body = invoicePDF.getContent();
        attachment.setInline(false);
        
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        mail.setToAddresses(new String[] {email});
        mail.setSubject('Invoice PDF');
        mail.setHtmlBody('Here is the invoice PDF for your contract.');
        mail.setFileAttachments(new Messaging.EmailFileAttachment[] {attachment});
        
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] {mail});
        
    }
    
    
    
    
    
}