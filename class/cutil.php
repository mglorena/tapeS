<?php

require_once '/var/www/html/tape/class/cerrors.php';
require_once '/var/www/html/tape/class/cconf.php';

class Util
{

    //put your code here
    public function strinformatdate($date)
    {

        if (!empty($date)) {
            $var = explode('/', str_replace('-', '/', $date));
            return "$var[2]-$var[1]-$var[0]";
        }
    }

    public function BorrarDirectorio($dir)
    {
        try {
            if (!file_exists($dir) || !is_dir($dir)) {
                //throw new Exception("$dir no existe o no es un directorio");
                return true;
            }

            if (!($open = opendir($dir))) {
                //throw new Exception("No se puede abrir el directorio $dir");
                return true;
            }

            while ($file = readdir($open)) {
                if ($file == "." || $file == "..") {
                    continue;
                }

                if (is_dir("$dir/$file")) {
                    borrar_directorio("$dir/$file");
                } else
                if (!unlink("$dir/$file")) {
                    //throw new UnlinkException("$dir/$file::No se pudo borrar el archivo");
                    return true;
                }

            }
            closedir($open);

            if (!rmdir($dir)) {
                //throw new NoDeleteException("$dir::No ha podido ser borrado");
                return true;
            }

            return true;
        } catch (\Throwable$th) {
            $error = new Errors();
            $error->SendMysqlErrorMessage($th, "cutil.php", "BorrarDirectorio", $dir);
        }

    }

}
