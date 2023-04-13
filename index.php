<?php
session_cache_expire(20);
require "/var/www/html/tape/class/csajax.php";
require "/var/www/html/tape/class/cwidget.php";
require_once '/var/www/html/tape/class/cerrors.php';
$sajax_request_type = "POST";
sajax_init();
sajax_export("SendJsError");
sajax_handle_client_request();

function SecurityPage()
{
    $rulesIds = explode(",", $_SESSION['S_rules']);

    if (in_array(36, $rulesIds)) { // ver la pagina emeralds
        echo '<script type="text/javascript" src="dashboard.js?' . Conf::VERSION . '"></script>';

    }

}

function SendJsError($ex, $pageName, $object)
{

    $errorS = new Errors();
    return $errorS->SendJsErrorMessage($ex, $pageName, $object);
}

include "include/header.php";
?>


<?php include "include/menu.php";?>
<script>
<?php
sajax_show_javascript();
?>
</script>
<style>
    #main-panel td {
        padding:5px;
    }
</style>
<?php SecurityPage();?>
<div id='divBoard' style='margin-top:15px;border:solid 0px black;margin-left:25px'>
</div>


<?php include "include/footer.php";?>