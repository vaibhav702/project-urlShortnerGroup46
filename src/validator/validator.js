function validateUrl(value) {
    return "^(?:(?:http(?:s)?|ftp)://)(?:\\S+(?::(?:\\S)*)?@)?(?:(?:[a-z0-9\u00a1-\uffff](?:-)*)*(?:[a-z0-9\u00a1-\uffff])+)(?:\\.(?:[a-z0-9\u00a1-\uffff](?:-)*)*(?:[a-z0-9\u00a1-\uffff])+)*(?:\\.(?:[a-z0-9\u00a1-\uffff]){2,})(?::(?:\\d){2,5})?(?:/(?:\\S)*)?$".test(
      value
    );
  }
//   # protocol identifier (optional) + //
//   group(list("http", maybe("s")) %or% "ftp", "://"),

//   # user:pass authentication (optional)
//   maybe(non_spaces,
//     maybe(":", zero_or_more(non_space)),
//     "@"),

//   #host name
//   group(zero_or_more(valid_chars, zero_or_more("-")), one_or_more(valid_chars)),

//   #domain name
//   zero_or_more(".", zero_or_more(valid_chars, zero_or_more("-")), one_or_more(valid_chars)),

//   #TLD identifier
//   group(".", valid_chars %>% at_least(2)),

//   # server port number (optional)
//   maybe(":", digit %>% between(2, 5)),

//   # resource path (optional)
//   maybe("/", non_space %>% zero_or_more()),

//   end
// )
  
  module.exports.validateUrl=validateUrl

