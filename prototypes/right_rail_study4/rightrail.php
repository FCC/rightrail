<?php

# Get default rightrail
// $file = "rr_29.html";
$file = "rr_default.html";
$rr_html = file_get_contents($file);

# What is URL of page?
$req_page =  "www.fcc.gov/somefile";

# What is topic of page?

# If some test get a different right rail

# Other dimensions to check?

# Clean up html
$rr_html = str_replace('"', '\"', $rr_html);
$rr_html = str_replace("\n", "\\\n", $rr_html);

# Return callback response
echo $_GET['callback'].'({"url" : "'. $_GET['url'] .'",
"content" : "'. $rr_html .'"});'

?>