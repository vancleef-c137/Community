global class Content {
@future (callout=true)
 
public static void contentpage (String url,String QuoteID){
 PageReference pg = new PageReference(url) ;
 QuoteDocument quotedoc = new QuoteDocument(); 
 Blob b ;
 b = pg.getContentAsPDF();
 quotedoc.QuoteId = QuoteID ;
 quotedoc.Document = b;
 
     insert quotedoc; 
   
 }
}