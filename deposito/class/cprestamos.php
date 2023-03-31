<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Prestamos
 *
 * @author root
 */
require_once ('/var/www/html/tape/class/cerrors.php');
require_once ('/var/www/html/tape/class/csqlprovider.php');
require_once ('/var/www/html/tape/class/cdump.php');

class Prestamo {

//put your code here


    var $PrestamoId = 'NULL',
            $Destino = '',
            $Solicitante = '',
            $EmailSolicitante = '',
            $AutorizadoPor = '',
            $ChoferesIds = '',
            $VehiculoId = 'NULL',
            $FechaInicio = 'NULL',
            $HoraSalida = 'NULL',
            $FechaFin = 'NULL',
            $HoraLlegada = 'NULL',
            $Observacion = '',
            $FileName = '',
            $NumPasajeros = 'NULL',
            $EstadoId = 'NULL',
            $Distancia = 'NULL',
            $PrecioCombustible = 'NULL',
            $FechaCreacion = 'NULL',
            $Mantenimiento = 'NULL',
            $GastoTotal = 'NULL',
            $UserId = 'NULL',
            $FechaMod = '';

    public function copy($object) {
        foreach (get_object_vars($object) as $key => $value) {
            $this->$key = $value;
        }
    }

    function GetListPrestamos($fI, $fF, $reId) {
        $Prestamos = array();
        $query = "call Prestamos_getListByFechas";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call Prestamos_getListByFechas('" . $fI . "','" . $fF . "'," . $reId . ");";

            if ($db->setQuery($query)) {
                $Prestamos = $db->ListArray();
            }
            $db->CloseMysql();
            return $Prestamos;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cPrestamos.php - getListByFechas", $query);
        }
        return null;
    }

    function GetPendientes() {
        $Prestamos = array();
        $query = "call Prestamos_getPendientes();";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            if ($db->setQuery($query)) {
                $Prestamos = $db->ListArray();
            }
            $db->CloseMysql();
            return $Prestamos;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cPrestamos.php - GetPendientes", $query);
        }
        return null;
    }

    function Search($dia, $mes, $anio, $typeve, $estado) {
        $Prestamos = array();
        $query = "call prestamos_search";
        try {
            $db = new sqlprovider();
            $db->getInstance();
	    if($dia == "" || is_null($dia) || !isset($dia) || empty($dia)){ $dia='1900-01-01';}
            $query = "call prestamos_search('" . $dia . "'," . $mes . "," . $anio . "," . $typeve . "," . $estado . ");";

            if ($db->setQuery($query)) {
                $Prestamos = $db->ListObject();
            }
            $db->CloseMysql();
            return $Prestamos;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cPrestamos.php - Search", $query);
        }
        return null;
    }

    function ReporteVehiculo($veId, $mes, $anio, $estado) {
        $Prestamos = array();
        $query = "call Prestamos_Search";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call Prestamos_ReporteVehiculo(" . $veId . "," . $mes . "," . $anio . "," . $estado . ");";

            if ($db->setQuery($query)) {
                $Prestamos = $db->ListObject();
            }
            $db->CloseMysql();
            return $Prestamos;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cPrestamos.php - ReporteVehiculo", $query);
        }
        return null;
    }

    function ReporteVehiculoDisp($desde, $hasta, $veId) {
        $Prestamos = array();
        $query = "call Prestamos_Search";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call Prestamos_ReporteVehiculoDisp('" . $desde . "','" . $hasta . "'," . $veId . ");";
            /* $e = new Errors();
              $e->SendErrorMessage(new Exception("testing"), "cPrestamos.php - Prestamos_ReporteVehiculoDisp", $query); */
            if ($db->setQuery($query)) {
                $Prestamos = $db->ListObject();
            }
            $db->CloseMysql();
            return $Prestamos;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cPrestamos.php - ReporteVehiculoDisp", $query);
        }
        return null;
    }

    function GetForCalendar($mes, $anio, $typeve, $estado) {
        $Prestamos = array();
        $query = "call Prestamos_getForCalendar";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call Prestamos_getForCalendar(" . $mes . "," . $anio . "," . $typeve . "," . $estado . ");";

            if ($db->setQuery($query)) {
                $Prestamos = $db->ListArray();
            }
            $db->CloseMysql();
            return $Prestamos;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cPrestamos.php - GetForCalendar", $query);
        }
        return null;
    }

    function GetByVehiculoId() {
        $Prestamos = array();
        $query = "call Prestamos_getByVehiculoId";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call Prestamos_getByVehiculoId('" . $this->VehiculoId . "');";

            if ($db->setQuery($query)) {
                $Prestamos = $db->ListObject();
            }
            $db->CloseMysql();
            return $Prestamos;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cPrestamos.php - GetByVehiculoId", $query);
        }
        return null;
    }

    function GetById() {
        $Prestamos = array();
        $query = "call Prestamos_getById";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call Prestamos_getById('" . $this->PrestamoId . "');";

            if ($db->setQuery($query)) {
                $Prestamos = $db->ListObject();
            }
            $db->CloseMysql();
            return $Prestamos;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cPrestamos.php - GetById", $query);
        }
        return null;
    }

    function GetByEstadoId() {
        $Prestamos = array();
        $query = "call Prestamos_getByEstadoId";
        try {
            $db = new sqlprovider();
            $db->getInstance();
            $query = "call Prestamos_getByEstadoId('" . $this->EstadoId . "');";

            if ($db->setQuery($query)) {
                $Prestamos = $db->ListObject();
            }
            $db->CloseMysql();
            return $Prestamos;
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cPrestamos.php - GetByEstadoId", $query);
        }
        return null;
    }

    function GrabarCosto($costo, $reId) {
        $query = "";
        try {
            $query = "call Prestamos_updateCosto(" . $costo . "," . $reId . ");";
            $db = new sqlprovider();
            $db->getInstance();
            $db->setQuery($query);
            if ($db->execute() == "1") {
                $db->CloseMysql();
                return true;
            } else {
                $db->CloseMysql();
                $e = new Errors();
                $e->SendErrorMessage(new ErrorException("Error en update costo - Prestamos :" . $query), "cPrestamos.php - updateCosto", $query);
                return false;
            }
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cPrestamos.php - updateCosto:" . $query, $query);
        }
        return false;
    }

    function UploadFile($name, $reId) {
        $query = "";
        try {
            $query = "call Prestamos_updateFile('" . $name . "'," . $reId . ");";
            $db = new sqlprovider();
            $db->getInstance();
            $db->setQuery($query);
            if ($db->execute() == "1") {
                $db->CloseMysql();
                return true;
            } else {
                $db->CloseMysql();
                $e = new Errors();
                $e->SendErrorMessage(new ErrorException("Error en update file - Prestamos :" . $query), "cPrestamos.php - updateFile", $query);
                return false;
            }
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cPrestamos.php - UploadFile:" . $query, $query);
        }
        return false;
    }

    function Save() {
        $query = "";
        try {
            $query = "call Prestamos_update('" . $this->Destino . "','" . $this->Solicitante . "','" . $this->EmailSolicitante . "',
            '" . $this->AutorizadoPor . "'," . $this->VehiculoId . ",'" . $this->FechaInicio . "',
            '" . $this->HoraSalida . "','" . $this->FechaFin . "','" . $this->HoraLlegada . "','" . $this->Observacion . "',
            '" . $this->FileName . "'," . $this->NumPasajeros . "," . $this->EstadoId . "
            ," . $this->Mantenimiento . "," . $this->GastoTotal . "," . $this->Distancia . "," . $this->PrestamoId . ",'" . $this->UserId . "');";

            $db = new sqlprovider();
            $db->getInstance();
            $db->setQuery($query);
            if ($db->execute() == "1") {
                $db->CloseMysql();
                $this->DeleteChoferes($this->PrestamoId);
                $this->UpdateChoferes($this->PrestamoId, $this->ChoferesIds);
                return true;
            } else {
                $db->CloseMysql();
                $e = new Errors();
                $e->SendErrorMessage(new ErrorException("Error en Save - Prestamos :" . $query), "cPrestamos.php - Save", $query);
                return false;
            }
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cPrestamos.php - Save:" . $query, $query);
        }
        return false;
    }

    function Insert() {
        $query = "";
        try {
            $query = "call Prestamos_insert('" . $this->Destino . "','" . $this->Solicitante . "','" . $this->EmailSolicitante . "',
            '" . $this->AutorizadoPor . "'," . $this->VehiculoId . ",'" . $this->FechaInicio . "',
            '" . $this->HoraSalida . "','" . $this->FechaFin . "','" . $this->HoraLlegada . "'," . $this->NumPasajeros . "
                ," . $this->EstadoId . ",'" . $this->Observacion . "',
            '" . $this->FileName . "'," . $this->Mantenimiento . ",'" . $this->Distancia . "','" . $this->UserId . "');";
            $db = new sqlprovider();
            $db->getInstance();
            $Prestamo = array();
            if ($db->setQuery($query)) {
                $Prestamo = $db->ListArray();
            }
            $db->CloseMysql();
            if (isset($Prestamo) == 1) {
                $this->DeleteChoferes($Prestamo[0][0]);
                $this->UpdateChoferes($Prestamo[0][0], $this->ChoferesIds);
                return true;
            }
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cPrestamos.php - Insert:" . $query, $query);
        }
        return false;
    }

    function DeleteChoferes($reId) {

        $query = "";
        try {
            $query .="call Prestamos_delChoferes(" . $reId . ");";
            $db = new sqlprovider();
            $db->getInstance();
            $db->setQuery($query);

            if ($db->execute() == "1") {
                $db->CloseMysql();
                return true;
            } else {
                $db->CloseMysql();
                return false;
            }
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cPrestamos.php - DeleteChofer", $query);
        }
        return false;
    }

    function UpdateChoferes($reId, $choferesIds) {

        $query = "";
        try {
            foreach ($choferesIds as $ch) {
                if ($ch != '') {
                    $query = "call Prestamos_addChofer(" . $reId . "," . $ch . ");";
                    $db = new sqlprovider();
                    $db->getInstance();
                    $Prestamo = array();
                    if ($db->setQuery($query)) {
                        $Prestamo = $db->ListArray();
                    }
                    $db->CloseMysql();

                    if (isset($Prestamo) != 1) {
                        $e = new Errors();
                        $e->SendErrorMessage(new Exception("Error updating PrestamoChofer"), "cPrestamos.php - Add Chofer" . $query, $query);
                    }
                }
            }
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cPrestamos.php - UpdateChoferes:" . $query, $query);
        }
    }

    function Delete() {

        $query = "";
        try {
            $query .="call Prestamos_delete(" . $this->PrestamoId . ");";
            $db = new sqlprovider();
            $db->getInstance();
            $db->setQuery($query);
            if ($db->execute() == "1") {
                $db->CloseMysql();
                return true;
            } else {
                $db->CloseMysql();
                return false;
            }
        } catch (Exception $ex) {
            $e = new Errors();
            $e->SendErrorMessage($ex, "cPrestamos.php - Delete", $query);
        }
        return false;
    }

}

?>
