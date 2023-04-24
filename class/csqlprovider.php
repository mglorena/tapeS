<?php
require_once '/var/www/html/tape/class/cerrors.php';
require_once '/var/www/html/tape/class/cconf.php';

class sqlprovider
{

    public $conexion;
    public $resource;
    public $sql;
    public $queries;
    public $singleton;

    /* var $dbname = $BD_NAME; */

    public function getInstance()
    {

        if (isset($this->singleton)) {
            $this->$singleton = new DataBase();
        }
        return $this->singleton;
    }

    public function execute()
    {
        $error = new Errors();
        try {

            $this->conexion = mysqli_connect(Conf::BD_SERVER, Conf::BD_USER, Conf::BD_PASS);
            mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
            mysqli_set_charset($this->conexion, "utf8");
            //mysqli_select_db(Conf::BD_NAME, $this->conexion);
            mysqli_select_db($this->conexion, Conf::BD_NAME);
            $this->queries = 0;
            $this->resource = null;
            mysqli_query($this->conexion, "SET character_set_client=utf8");
            mysqli_query($this->conexion, "SET character_set_connection=utf8");
            mysqli_query($this->conexion, "SET character_set_database=utf8");
            mysqli_query($this->conexion, "SET character_set_results=utf8");
            mysqli_query($this->conexion, "SET character_set_server=utf8");
            mysqli_query($this->conexion, "SET NAMES 'utf8'");
            $this->sql = utf8_encode($this->sql);
            if (!$this->conexion->set_charset("utf8")) {
                $error->SendMysqlErrorMessage("Error cargando el conjunto de caracteres utf8: %\n", $this->conexion->error);

            }
            if (!($this->resource = mysqli_query($this->conexion, $this->sql))) {
                $error->SendMysqlErrorMessage(mysqli_error($this->conexion), "csqlprovider.php", "execute", $this->sql . "---" . mysqli_error($this->conexion));
                return null;
            }
            $this->queries++;
            return $this->resource;
        } catch (Exception $ex) {

            $error->SendMysqlErrorMessage(mysqli_error($this->conexion), "csqlprovider.php", "execute", $this->sql . $ex->Message);
        }
        return null;
    }

    public function update()
    {
        // echo $this->sql;
        if (!($this->resource = mysqli_query($this->conexion, $this->sql))) {
            $error = new Errors();
            $error->SendMysqlErrorMessage(mysqli_error($this->conexion), "csqlprovider.php", "update", $this->sql);
            return false;
        }
        return true;
    }

    public function ErrorDetail()
    {
        return mysqli_error($this->conexion);
    }

    public function ListArray()
    {
        try {
            if (!($cur = $this->execute())) {

                return null;
            }
            $array = array();
            while ($row = @mysqli_fetch_array($cur)) {
                $array[] = $row;
            }
            return $array;
        } catch (\Throwable$th) {
            $error = new Errors();
            $error->SendMysqlErrorMessage(mysqli_error($this->conexion), "csqlprovider.php", "ListArray", $cur);
        }

    }

    public function ListObject()
    {

        if (!($cur = $this->execute())) {

            return null;
        }

        $array = array();
        while ($row = @mysqli_fetch_object($cur)) {
            array_push($array, $row);
        }
        return $array;
    }

    public function ListObject2()
    {
        if (!($cur = $this->execute())) {

            return null;
        }

        $array = array();
        while ($row = @mysqli_fetch_row($cur)) {
            array_push($array, $row);
        }
        return $array;
    }

    public function setQuery($sql)
    {
        if (empty($sql)) {
            return false;
        }
        $this->sql = $sql;
        return true;
    }

    public function freeResults()
    {
        @mysqli_free_result($this->resource);
        return true;
    }

    public function getObject()
    {
        if ($cur = $this->execute()) {
            if ($object = mysqli_fetch_object($cur)) {
                @mysqli_free_result($cur);
                return $object;
            } else {
                $error = new Errors();
                $error->SendMysqlErrorMessage(mysqli_error($this->conexion), "csqlprovider.php", "getObject", $this->sql);
                return null;
            }
        } else {
            return false;
        }
    }

    public function CloseMysql()
    {
        // @mysqli_free_result($this->resource);
        @mysqli_close($this->conexion);
    }

}
