<?php
require_once '../class/cutil.php';
require_once 'class/choraex.php';
require_once '../class/cdump.php';
require_once '../class/cconf.php';
require "../class/csajax.php";

require_once '/var/www/html/tape/class/cerrors.php';
function SendJsError($ex, $pageName, $object)
{

    $errorS = new Errors();
    return $errorS->SendJsErrorMessage($ex, $pageName, $object);
}
$sajax_request_type = "POST";
sajax_init();
sajax_export("LoadHoraEx", "SendJsError", "LoadGridOnly");
sajax_handle_client_request();

function SecurityPage()
{
    $rulesIds = explode(",", $_SESSION['S_rules']);
    if (!in_array(13, $rulesIds)) { // ver la pagina horaex
        echo "<script>window.location ='" . $HOST_URL . "noautorization.php?p=HoraEx';</script>";
    }
    echo "<script>";
    if (!in_array(14, $rulesIds)) {
        echo "var hasUpdate =false;";
    } else {
        echo "var hasUpdate =true;";
    }

    if (!in_array(15, $rulesIds)) {
        echo "var hasInsert =false;";
    } else {
        echo "var hasInsert =true;";
    }

    echo "</script>";
}

function LoadGridOnly($meses, $anio)
{
    try {
        $horaexSearch = new HoraEx();
        $horaex = $horaexSearch->SearchRepByPersonas($meses, $anio);
        $response = array("1" => $horaex);
        return $response;
    } catch (Exception $ex) {
        $error = new Errors();
        $error->SendErrorMessage($ex, 'horaexrepch.php - LoadGridOnly', $e);
    }
}
function LoadHoraEx($meses, $anio)
{

    $horaexSearch = new HoraEx();
    $horaex = $horaexSearch->SearchRepByPersonas($meses, $anio);
    $response = array("1" => $horaex);
    return $response;
}
?>
<?php include "../include/header.php";?>
<?php include "../include/menu.php";
?>
<script>
<?php
sajax_show_javascript();
?>
</script>
<style>
    .recuadre{
        background-color: #ccc;
    }
</style>
<?php SecurityPage();?>
<?php
echo '<script type="text/javascript" src="horaexrepch.js?' . Conf::VERSION . '"></script>';
?>

<div id="content">
    <div id="tblHoraEx"></div>
</div>

<?php include "../include/footer.php";?>
