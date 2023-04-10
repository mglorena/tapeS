<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Errors
 *
 * @author root
 */
require_once '/var/www/html/tape/class/cphpmailer.php';
require_once '/var/www/html/tape/class/cbrowserinfo.php';
require_once '/var/www/html/tape/class/csmtp.php';
require_once '/var/www/html/tape/class/cconf.php';

class Errors
{

    public function SendDataMessage($pageName, $object)
    {

        $ex = 'Error mensaje - SendDataMessage';
        $subject = "Error reporte - TAPE" . ' - ' . $pageName;
        $body = "<b>Error Report - SendDataMessage</b><br/>";
        $body .= "<br/><b>Method :</b>" . $pageName;
        $body .= "<br/><br/><b>Detail</b><br/>" . $ex;
        $browser = new Browser();
        $body .= "<br/><br/><b>Browser Info</b><br/>";
        $body .= "<br/><b>Browser:</b>" . $browser->getBrowser() . "<br/>";
        $body .= "<b>Browser Version:</b>" . $browser->getVersion() . "<br/>";
        $exporte = var_export($object, true);
        $body .= "<br/><b>Datos:</b><br/>[" . $exporte . "<br/>]";
        $body .= "<br/><b>Server:</b>" . $_SERVER['SERVER_ADDR'];
        $body .= "<br/><b>REMOTE HOST:</b>" . $_SERVER['REMOTE_ADDR'];
        $mailer = new TapeMailer();
        $mailer->From = "mlgarcia@unsa.edu.ar";
        $mailer->FromName = "Lorena García";
        $mailer->Subject = $subject;
        $mailer->Host = 'localhost';
        $mailer->Mailer = 'smtp';
        $mailer->Body = $body;
        $mailer->IsHTML(true);
        $mailer->AddAddress(Conf::FROM_ALERT, 'Tape Errores');
        $mailer->Host = Conf::HOST_MAIL;
        $mailer->Port = Conf::SMTP_PORT;
        $mailer->Username = Conf::ERROR_USER;
        $mailer->Password = Conf::ERROR_PASS;
        return $mailer->Send();

    }

    public function SendJsErrorMessage($ex, $pageName, $object)
    {
        if (!isset($ex)) {
            $ex = 'Error mensaje - testing';
        }

        $subject = "Error reporte - TAPE";
        $body = "<b>Error Report - SendJsErrorMessage</b><br/>";
        $body .= "<br/><b>Method :</b>" . $pageName;
        $body .= "<br/><br/><b>Detail</b><br/>" . $ex;
        $browser = new Browser();
        $body .= "<br/><br/><b>Browser Info</b><br/>";
        $body .= "<br/><b>Browser:</b>" . $browser->getBrowser() . "<br/>";
        $body .= "<b>Browser Version:</b>" . $browser->getVersion() . "<br/>";
        $exporte = var_export($object, true);
        $body .= "<br/><b>Datos:</b><br/>[" . $exporte . "<br/>]";
        $body .= "<br/><b>Server:</b>" . $_SERVER['SERVER_ADDR'];
        $body .= "<br/><b>REMOTE HOST:</b>" . $_SERVER['REMOTE_ADDR'];

        $mailer = new TapeMailer();
        $mailer->From = "mlgarcia@unsa.edu.ar";
        $mailer->FromName = "Lorena García";
        $mailer->Subject = $subject;
        $mailer->Host = 'localhost';
        $mailer->Mailer = 'smtp';
        $mailer->Body = $body;
        $mailer->IsHTML(true);
        $mailer->AddAddress(Conf::FROM_ALERT, 'Tape Errores');
        $mailer->Host = Conf::HOST_MAIL;
        $mailer->Port = Conf::SMTP_PORT;
        $mailer->Username = Conf::ERROR_USER;
        $mailer->Password = Conf::ERROR_PASS;
        return $mailer->Send();
    }

    public function SendMysqlErrorMessage($ex, $pageName, $method, $object)
    {
        try {
            if (!isset($ex)) {
                $ex = 'Error mensaje - testing';
            }

            $name = "/var/www/html/tape/error1.sql";
            $ar = fopen($name, "a");
            fputs($ar, $pageName);
            fclose($ar);
            $subject = 'Error reporte - TAPE' . " - HOST:" . $_SERVER['SERVER_ADDR'] . " - " . $ex;
            $body = "<b>Error Report - SendMysqlErrorMessage</b><br/>";
            $body .= "<br/><b>File name:</b>" . $pageName;
            $body .= "<br/><b>Method:</b>" . $method;
            $body .= "<br/><b>Message: </b><br/>" . $ex;
            $body .= "<br/><br/><b>Browser Info</b><br/>";
            $browser = new Browser();
            $body .= "<b>Browser:</b>" . $browser->getBrowser() . "<br/>";
            $body .= "<b>Browser Version:</b>" . $browser->getVersion() . "<br/>";
            $exporte = var_export($object, true);
            $body .= "<br/>" . $exporte;
            $body .= "<br/>SERVER:" . (!isset($_SERVER['SERVER_ADDR']) ? '192.168.5.3' : $_SERVER['SERVER_ADDR']);
            $body .= "<br/>REMOTE HOST:" . $_SERVER['REMOTE_ADDR'];

            $mailer = new TapeMailer();
            $mailer->From = "mlgarcia@unsa.edu.ar";
            $mailer->FromName = "Lorena García";
            $mailer->Subject = $subject;
            $mailer->Host = 'localhost';
            $mailer->Mailer = 'smtp';
            $mailer->Body = $body;
            $mailer->IsHTML(true);
            $mailer->AddAddress(Conf::FROM_ALERT, 'Tape Errores');
            $mailer->Host = Conf::HOST_MAIL;
            $mailer->Port = Conf::SMTP_PORT;
            $mailer->Username = Conf::ERROR_USER;
            $mailer->Password = Conf::ERROR_PASS;
            return $mailer->Send();
        } catch (\Throwable$th) {
            return false;
        }

    }

    public function SendErrorMessage($ex, $pageName, $object)
    {
        $body = "<b>Error reporte - TAPE - SendErrorMessage</b><br/>";
        $subject = 'Error reporte - TAPE' . " - HOST:" . $_SERVER['SERVER_ADDR'] . " - ";
        /*if (!isset($ex)){

        $body .="<br/><b>File Name :</b>" . $ex->getFile();
        $subject .=$ex->getMessage();
        $body .="<br/><b>Code :</b>" . $ex->getCode();
        $body .="<br/><b>Line Number:</b>" . $ex->getLine();
        $body .="<br/><b>Message: </b><br/>" . $ex->getMessage();
        $body .="<br/><b>Trace:</b><br/>" . $ex->getTraceAsString();

        }
        else{
        $ex = 'Error mensaje - testing';

        $body.=$ex;
        }
         */
        $body .= "<br/><b>Method :</b>" . $pageName;
        $body .= "<br/><br/><b>Browser Info</b><br/>";
        $browser = new Browser();
        $body .= "<b>Browser:</b>" . $browser->getBrowser() . "<br/>";
        $body .= "<b>Browser Version:</b>" . $browser->getVersion() . "<br/>";
        $exporte = "Var_DUMP " . do_dump($object, 'object', true) . "<br/>";
        $exporte = "Var_DUMP " . var_dump($object, true) . "<br/>";
        $exporte .= "DEBUG " . debug_zval_dump($object, true) . "<br/>";
        try {
            $exporte .= "Export " . var_export($object, true) . "<br/>";

        } catch (Exception $ex) {
            $exporte .= "In testing";
        }
        /* $exporte .="Unseralize ".unserialize($object,true) . "<br/>";
        $exporte .="Print_r ".  print_r($object,true) . "<br/>";
        $exporte .="GET TYPE ". gettype($object) . "<br/>"; */
        $body .= "<br/>" . $exporte;
        $body .= "<br/>SERVER:" . (!isset($_SERVER['SERVER_ADDR']) ? '192.168.1.2' : $_SERVER['SERVER_ADDR']);
        $body .= "<br/>REMOTE HOST:" . $_SERVER['REMOTE_ADDR'];
        $body .= " - HOST:" . $_SERVER['SERVER_ADDR'];
        $mailer = new TapeMailer();
        $mailer->From = "mlgarcia@unsa.edu.ar";
        $mailer->FromName = "Lorena García";
        $mailer->Subject = $subject;
        $mailer->Host = 'localhost';
        $mailer->Mailer = 'smtp';
        $mailer->Body = $body;
        $mailer->IsHTML(true);
        $mailer->AddAddress(Conf::FROM_ALERT, 'Tape Errores');
        $mailer->Host = Conf::HOST_MAIL;
        $mailer->Port = Conf::SMTP_PORT;
        $mailer->Username = Conf::ERROR_USER;
        $mailer->Password = Conf::ERROR_PASS;
        return $mailer->Send();
    }

}
