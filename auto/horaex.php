<?php
require_once '../class/cutil.php';
require_once 'class/choraex.php';
require_once 'class/cdependencias.php';
require_once '../tarja/class/cpersonas.php';
require_once 'class/cvehiculos.php';
require_once '../class/cdump.php';
require_once '../class/cconf.php';
require '../class/csajax.php';

require_once '/var/www/html/tape/class/cerrors.php';

function SendJsError($ex, $pageName, $object)
{

    $errorS = new Errors();
    return $errorS->SendJsErrorMessage($ex, $pageName, $object);
}
$sajax_request_type = 'POST';
sajax_init();
sajax_export('SaveHoraEx', 'LoadHoraEx', 'DeleteHoraEx', 'SendJsError', 'SaveEstado', 'LoadGridOnly');
sajax_handle_client_request();

function SecurityPage()
{
    $rulesIds = explode(',', $_SESSION['S_rules']);
    if (!in_array(13, $rulesIds)) {

        echo "<script>window.location ='" . $HOST_URL . "noautorization.php?p=HoraEx';</script>";
    }
    echo '<script>';
    if (!in_array(14, $rulesIds)) {
        echo 'var hasUpdate =false;';
    } else {
        echo 'var hasUpdate =true;';
    }

    if (!in_array(15, $rulesIds)) {
        echo 'var hasInsert =false;';
    } else {
        echo 'var hasInsert =true;';
    }

    echo '</script>';
}

function SaveHoraEx($e)
{

    try {

        $horaex = json_decode(utf8_encode($e), JSON_UNESCAPED_UNICODE);
        $hex = new HoraEx();
        $hex->HoraExId = ($horaex['HoraExId'] ? $horaex['HoraExId'] : 0);
        $hex->PersonaId = $horaex['PersonaId'];
        $hex->Fecha = $horaex['Fecha'];
        $hex->Entrada = $horaex['Entrada'];
        $hex->Salida = $horaex['Salida'];
        $hex->Concepto = utf8_decode($horaex['Concepto']);
        $hex->Calculado = ($horaex['Calculado'] ? $horaex['Calculado'] : 0);
        $hex->Zona = $horaex['Zona'];
        $hex->TotalHoras = ($horaex['TotalHoras'] ? $horaex['TotalHoras'] : 0);
        $hex->DependenciaId = $horaex['DependenciaId'];
        //$hex->Create = $horaex['Create'];
        //$hex->Modified = $horaex['Modified'];
        $hex->VehiculoId = ($horaex['VehiculoId'] != "" ? $horaex['VehiculoId'] : 0);
        $hex->TMEntrada = ($horaex['TMEntrada'] ? $horaex['TMEntrada'] : 0);
        $hex->TMSalida = ($horaex['TMSalida'] ? $horaex['TMSalida'] : 0);
        $hex->TTEntrada = ($horaex['TTEntrada'] ? $horaex['TTEntrada'] : 0);
        $hex->TTSalida = ($horaex['TTSalida'] ? $horaex['TTSalida'] : 0);
        $hex->Responsable = utf8_decode($horaex['Responsable']);
        $hex->Hora50 = $horaex['Hora50'];
        $hex->Hora100 = $horaex['Hora100'];
        $hex->Descansos = $horaex['Descansos'];
        $hex->EstadoId = ($horaex['EstadoId'] ? $horaex['EstadoId'] : 0);
        $hex->Estado = ($horaex['Estado'] ? $horaex['Estado'] : 0);
        $hex->Jornada = $horaex['Jornada'];
        $error = new Errors();
        $error->SendDataMessage('horaex.php - SaveHoraEx', $hex);
        return $hex->Save();

    } catch (Exception $excep) {
        $error = new Errors();
        $error->SendErrorMessage($excep, 'horaex.php - SaveHoraEx', $e);

    } finally {

    }
}

function DeleteHoraEx($horaexId)
{

    $he = new HoraEx();
    $he->HoraExId = $horaexId;
    return $he->Delete();
}

function SaveEstado($e)
{

    try {
        $horaex = json_decode($e);
        $hex = new HoraEx();
        return $hex->SaveEstado($horaex);

    } catch (Exception $ex) {
        $error = new Errors();
        $error->SendErrorMessage($ex, 'horaex.php - SaveEstado', $e);
    }
}

function LoadHoraEx($mes, $anio, $personId, $dep)
{

    $horaexSearch = new HoraEx();
    $deps = new Dependencias();
    $pers = new Persona();
    $ve = new Vehiculo();
    //if ( isset( $dia ) ) $dia = 0;
    if (!isset($personId)) {
        $personId = 0;
    }

    if (!isset($dep)) {
        $dep = 0;
    }

    $horaex = $horaexSearch->Search($mes, $anio, $personId, $dep);
    $response = array('1' => $horaex, '2' => $deps->GetAll(), '3' => $pers->GetAllPersons(), '4' => $ve->GetAll());
    return $response;
}

function LoadGridOnly($mes, $anio, $personId, $dep)
{
    try {
        $horaexSearch = new HoraEx();
        $horaex = $horaexSearch->Search($mes, $anio, $personId, $dep);
        $response = array('1' => $horaex);
        //$e = new Errors();
        //$e->SendDataMessage("LoadGridOnly - despues de json", $horaex);

        return $response;
    } catch (Exception $ex) {
        $error = new Errors();
        $error->SendErrorMessage($ex, 'horaex.php - SaveEstado', $e);
    }
}
?>
<?php include '../include/header.php';
?>
<?php include '../include/menu.php';
?>
<script>
<?php
sajax_show_javascript();
?>
</script>
<style>
.recuadre {
    background-color: #ccc;
}
</style>
<?php SecurityPage();
?>
<?php /* LoadHoraEx( true, true, 11, 2012, 1 );
 */?>

<?php
echo '<script type="text/javascript" src="horaex.js?' . Conf::VERSION . '"></script>';
?>
<div id = 'content'>
<div id = 'tblHoraEx'></div>
</div>
<input type = 'hidden' id = 'hdnHoraExId' value = '0'/>
<input type = 'hidden' id = 'hdnPersonasIds' value = ''/>
<?php include '../include/footer.php';
?>
