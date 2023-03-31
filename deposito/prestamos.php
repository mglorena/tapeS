<?php
require_once ('../class/cutil.php');
require_once ('class/cprestamos.php');
require_once ('../class/cdump.php');
require_once ('../class/cconf.php');
require("../class/csajax.php");

require_once ('/var/www/html/tape/class/cerrors.php');
function SendJsError($ex, $pageName, $object) {

    $errorS = new Errors();
    return $errorS->SendJsErrorMessage($ex, $pageName, $object);
}
$sajax_request_type = "POST";
//$sajax_debug_mode = 0;

sajax_init();
sajax_export("GetDisponibles", "SavePrestamo", "LoadPrestamos", "DeletePrestamo", "GetPrestamosSaved", "InfoPresupuesto", "GrabarCosto", "SendJsError");
sajax_handle_client_request();

function SecurityPage() {
    $rulesIds = explode(",", $_SESSION['S_rules']);
    if (!in_array(37, $rulesIds)) { // ver la pagina Prestamos
        echo "<script>window.location ='" . $HOST_URL . "noautorization.php?p=Prestamos';</script>";
    }
    echo "<script>";
    if (!in_array(38, $rulesIds)) // editor o borrar
        echo "var hasUpdate =false;";
    else
        echo "var hasUpdate =true;";
    if (!in_array(39, $rulesIds)) // insertar 
        echo "var hasInsert =false;";
    else
        echo "var hasInsert =true;";
    echo "</script>";
}

function GetPrestamosSaved($fI, $fF, $reId) {
    $u = new Util();

    $Prestamosearch = new Prestamo();
    try {
        $fI = $u->strinformatdate($fI);
        $fF = $u->strinformatdate($fF);
        $Prestamos = $Prestamosearch->GetListPrestamos($fI, $fF, $reId);
        return $Prestamos;
    } catch (Exception $ex) {
        $error = new Errors();
        $error->SendErrorMessage($ex, "Prestamos.php - GetPrestamosSaved", $Prestamosearch);
    }
    return null;
}

function GetDisponibles($fI, $fF, $nump, $reId) {
    try {

        $ve = new Vehiculo();
        $ch = new Chofer();
        if ($reId == "" || $reId == null)
            $reId = 0;
        $response = array("1" => $ve->GetVehiculosDispo($fI, $fF, $nump, $reId), "2" => $ch->GetDisponibles($fI, $fF, $reId));
        return $response;
    } catch (Exception $ex) {
        $error = new Errors();
        $error->SendErrorMessage($ex, "Prestamos.php - GetPrestamosSaved", $reId);
    }
    return null;
}


function InfoPresupuesto($PrestamoId) {
    $Prestamosearch = new Prestamo();
    try {
        $Prestamosearch->PrestamoId = $PrestamoId;
        $Prestamo = $Prestamosearch->GetById();

        foreach ($Prestamo as $re) {
            $des = $re->Destino;
            $chIds = $re->ChoferesIds;
            $veId = $re->VehiculoId;
            $feIni = $re->FechaInicio;
            $horaIni = $re->HoraSalida;
            $feFin = $re->FechaFin;
            $horaFin = $re->HoraLlegada;
            $dist = $re->Distancia;
            $gasto = $re->GastoTotal;

            $vehiculoSearch = new Vehiculo();
            $vehiculoSearch->VehiculoId = $veId;
            $vehiculo = $vehiculoSearch->GetByVehiculoId();
            $veDesc = $vehiculo[0]->Modelo . " " . $vehiculo[0]->Patente;
            $cons = $vehiculo[0]->ConsumoxKM;
            $cmb = Combustible::toString($vehiculo[0]->CombustibleId);
            $choferes = array();
            $i = 0;
            $chof = explode(",", $chIds);
            foreach ($chof as $c) {
                $choferSearch = new Chofer();
                $choferSearch->ChoferId = $c;
                $chofer = $choferSearch->GetByChoferId();
                $choferes[$i] = $chofer[0];
                $i++;
            }
        }
    } catch (Exception $ex) {
        $error = new Errors();
        $error->SendErrorMessage($ex, "Prestamos.php - EditPrestamo", $Prestamosearch);
    }

    $return = array("1" => $des, "2" => $chIds, "3" => $veDesc,
        "4" => $feIni, "5" => $horaIni, "6" => $feFin, "7" => $horaFin, "8" => $dist,
        "9" => $gasto, "10" => $PrestamoId, "11" => $cons, "12" => $cmb, "13" => $choferes);

    return $return;
}


function GrabarCosto($costo, $reId) {
    $re = new Prestamo();
    return $re->GrabarCosto($costo, $reId);
}

function SavePrestamo($r) {
    try {
        $Prestamo = json_decode($r);
        $re = new Prestamo();
        $re->copy($Prestamo);
        if ($re->PrestamoId == 0)
            return $re->Insert();
        else
            return $re->Save();
    } catch (Exception $ex) {
        $error = new Errors();
        $error->SendErrorMessage($ex, "Prestamos.php - SavePrestamo", $r);
    }
}

function DeletePrestamo($PrestamoId) {

    $ve = new Prestamo();
    $ve->PrestamoId = $PrestamoId;
    $u = new Util();
    if ($ve->Delete()) {
        if ($u->BorrarDirectorio("files/" . $PrestamoId))
            return true;
        else
            return false;
    }
    else
        return false;
}

function LoadPrestamos($dia,$mes, $anio, $type, $estado) {

    $Prestamosearch = new Prestamo();
    $tve = new TipoVehiculo();
    $ve = new Vehiculo();
    $ch = new Chofer();
    if($dia == 0) $dia = NULL;
    $Prestamos = $Prestamosearch->Search($dia,$mes, $anio, $type, $estado);
    $response = array("1" => $Prestamos, "2" => $tve->GetAll(), "3" => $ve->GetAll(), "4" => $ch->GetAll());
    return $response;
}
?>
<?php include "../include/header.php"; ?>
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
<?php SecurityPage(); ?>
<?php /* LoadPrestamos(true, true,11,2012,1); */ ?>

<?php
echo '<script type="text/javascript" src="Prestamos.js?' . Conf::VERSION . '"></script>';
?>
<link type="text/css" rel="stylesheet" href="../css/jquery.tooltip.css" />
<script type="text/javascript" src="../js/jquery.tooltip.min.js"></script>
<div id="content">


    <div id="tblPrestamos"></div>


    <div id="fi-form"></div>
  <div id="cost-form"></div>
    
</div>
<input type="hidden" id="hdnPrestamoId" value="0"/>
<input type="hidden" id="hdnChoferesIds" value=""/>
<?php include "../include/footer.php"; ?>
