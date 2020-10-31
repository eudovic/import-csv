<?php
        $dbTable="usuarios"; //tabela que recebera a query

         $tabelas=$dados['tabelas'];
        $data=$dados['data'];
        if($dados['serial']==0){
            $query="INSERT IGNORE INTO usuarios (";
            $countTrHead=1;
            foreach($tabelas as $tabela){
                count($tabelas) > $countTrHead ?  $query.=$tabela."," :  $query.=$tabela.")";
                $countTrHead++;
            }
            $query.="VALUES";
            $countData=1;
            foreach ($data as $trs){
                $countTrBody=1;
                $query.="(";
                foreach($trs as $tr){
                    if(count($data) > $countData){
                        count($trs) > $countTrBody ?  $query.="'".$newPhrase = str_replace("'", " ", $tr)."'"."," :  $query.="'".str_replace("'", " '", $tr)."'"."),";
                    }else{
                        count($trs) > $countTrBody ?  $query.="'".str_replace("'", " '", $tr)."'"."," :  $query.="'".str_replace("'", " '", $tr)."'".");";
                    }
                    
                    
                    $countTrBody++;
                }
                $countData++;
            }
        }else{
            foreach ($data as $trs){
               
                $query="INSERT IGNORE INTO usuarios (";
                $countTrHead=1;
                foreach($tabelas as $tabela){
                    count($tabelas) > $countTrHead ?  $query.=$tabela."," :  $query.=$tabela.")";
                    $countTrHead++;
                }
                $query.="VALUES";
                $countData=1;
                $countTrBody=1;
                $query.="(";
                foreach($trs as $tr){
                    if(count($data) > $countData){
                        count($trs) > $countTrBody ?  $query.="'".$newPhrase = str_replace("'", " ", $tr)."'"."," :  $query.="'".str_replace("'", " '", $tr)."'".");";
                    }else{
                        count($trs) > $countTrBody ?  $query.="'".str_replace("'", " '", $tr)."'"."," :  $query.="'".str_replace("'", " '", $tr)."'".");";
                    }
                    
                    
                    $countTrBody++;
                }
                $countData++;
                 $r = $this->selectDB($query);
                $retorno[]=['query'=>$query,'retorno'=>$r];
                sleep(1);
            } 

            return $retorno;
        }
       //return $query;
        try{

            $r = $this->selectDB($query);
            return $r ;
        }catch (Exception $e) {
            return false;
       }
         
        return $r;
     ?>