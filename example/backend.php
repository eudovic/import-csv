<?php
        $dbTable="usuarios"; //tabela que recebera a query

        $tabelas=$dados['tabelas'];
        $data=$dados['data'];
        $query="INSERT IGNORE INTO $dbTable (";
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
                    count($trs) > $countTrBody ?  $query.="'".$tr."'"."," :  $query.="'".$tr."'"."),";
                }else{
                    count($trs) > $countTrBody ?  $query.="'".$tr."'"."," :  $query.="'".$tr."'".");";
                }
                   
                
                $countTrBody++;
            }
            $countData++;
        }
       // return $query;
        try{
            $r = $this->selectDB($query);
            return $r ;
        }catch (Exception $e) {
            return false;
       }
     ?>