<?php
require_once ('class/cchoferes.php');
require_once ('../class/cdump.php');
require_once ('/var/www/html/tape/class/cerrors.php');
require_once ('../class/cconf.php');
require("../class/csajax.php");
$sajax_request_type = "POST";
sajax_init();
sajax_export("SaveChofer", "LoadChoferes", "DeleteChofer", "SendJsError");
sajax_handle_client_request();

function SecurityPage() {
    try {
        $rulesIds = explode(",", $_SESSION['S_rules']);
        if (!in_array(19, $rulesIds)) { // ver la pagina reservas
            echo "<script>window.location ='" . $_SERVER['SERVER_ADDR'] . "noautorization.php?p=Choferes';</script>";
        }
        echo "<script>";
        if (!in_array(20, $rulesIds)) // editor o borrar
            echo "var hasUpdate =false;";
        else
            echo "var hasUpdate =true;";
        if (!in_array(21, $rulesIds)) // insertar 
            echo "var hasInsert =false;";
        else
            echo "var hasInsert =true;";
        echo "</script>";
    } catch (ErrorException $ex) {
        $e = new Errors();
        $e->SendErrorMessage($ex, "choferes.php - LoadChoferes", "rulesIds");
    }
}

function SendJsError($ex, $pageName, $object) {

    $errorS = new Errors();
    return $errorS->SendJsErrorMessage($ex, $pageName, $object);
}

function SaveChofer($cch) {
    
    try {

        $chofer = json_decode(utf8_encode($cch),JSON_UNESCAPED_UNICODE);     
        $ch = new Chofer();
        $ch->ChoferId = $chofer['ChoferId'];
        $ch->FirstName = utf8_decode($chofer['FirstName']);
        $ch->LastName = utf8_decode($chofer['LastName']);
        $ch->Legajo = $chofer['Legajo'];
        $ch->Celular = $chofer['Celular'];
        
        $ch->Licencia1 = $chofer['Licencia1'];
        $ch->Licencia2 = $chofer['Licencia2'];
        $ch->Licencia3 = $chofer['Licencia3'];
        $ch->Active = ($chofer['Active'] == "on" ? "1" : "0");
     
        if (!isset($ch->ChoferId))
            $ch->ChoferId = 0;
        $e = new Errors();
            $e->SendDataMessage("choferes.php - despues de json", $chofer);  
            $e->SendDataMessage("choferes.php - antes de json", $cch);  
            $e->SendDataMessage("choferes.php - objecto para db ", $ch);  
        return $ch->Save();
    } catch (ErrorException $ex) {
        $e = new Errors();
        $e->SendErrorMessage($ex, "cchoferes.php - SaveChofer", $chofer);
    }
}

function DeleteChofer($choferId) {
    try {
        $ch = new Chofer();
        $ch->ChoferId = $choferId;
        return $ch->Delete();
    } catch (ErrorException $ex) {
        $e = new Errors();
        $e->SendErrorMessage($ex, "choferes.php - DeleteChofer", $choferId);
    }
}

function LoadChoferes() {
    $choferSearch = new Chofer();
    try {
        $choferes = $choferSearch->Search();
        $return = array("1" => $choferes);
        return $return;
    } catch (ErrorException $ex) {
        $e = new Errors();
        $e->SendErrorMessage($ex, "choferes.php - LoadChoferes", $choferSearch);
    }
}
?>
<?php include "../include/header.php"; ?>
<?php include "../include/menu.php"; ?>
<script>
<?php
sajax_show_javascript();
?>
</script>
<?php SecurityPage(); ?>

<?php
echo '<script type="text/javascript" src="choferes.js?' . Conf::VERSION . '"></script>';
?>
<div id="content">
    <div id="tblChoferes"></div>
</div>
<input type="hidden" id="hdnChoferId" value="0"/>
<?php include "../include/footer.php"; ?>