<?php

class Locker implements Serializable
{
    private $regex = "";
    private $answer = "";
    private $urlsNum = 0;
    private $logo = "";
    private $usrls = "";
    private $type = "";
    private $attemptsNumber = 0;
    private $showAttempts = false;
    private $points = 0;
    private $forceOrder;
    private $resourcesNum = 0;
    private $resources = "";

    public function __construct($regex, $answer, $urlsNum, $logo, $usrls, $type, $attemptsNumber, $showAttempts, $points, $forceOrder, $resourcesNum, $resources)
    {
        $this->regex = $regex;
        $this->answer = $answer;
        $this->urlsNum = $urlsNum;
        $this->logo = $logo;
        $this->usrls = $usrls;
        $this->type = $type;
        $this->attemptsNumber = $attemptsNumber;
        $this->showAttempts = $showAttempts;
        $this->points = $points;
        $this->forceOrder = $forceOrder;
        $this->resourcesNum = $resourcesNum;
        $this->resources = $resources;
    }

    public function getRegex()
    {
        return $this->regex;
    }

    public function getAnswer()
    {
        return $this->answer;
    }
    public function getUrlNum()
    {
        return $this->urlsNum;
    }

    public function getLogo()
    {
        return $this->logo;
    }

    public function getUsrls()
    {
        return $this->usrls;
    }

    public function getType()
    {
        return $this->type;
    }

    public function getAttemptsNumber()
    {
        return $this->attemptsNumber;
    }

    public function getShowAttempts()
    {
        return $this->showAttempts;
    }

    public function getPoints()
    {
        return $this->points;
    }

    public function getForceOrder()
    {
        return $this->forceOrder;
    }

    public function getResourcesNum()
    {
        return $this->resourcesNum;
    }

    public function getResources()
    {
        return $this->resources;
    }

    public function serialize()
    {
        return serialize(
            array(
                "regex" => $this->regex,
                "answer" => $this->answer,
                "urlsNum" => $this->urlsNum,
                "logo" => $this->logo,
                "usrls" => $this->usrls,
                "type" => $this->type,
                "attemptsNumber" => $this->attemptsNumber,
                "showAttempts" => $this->showAttempts,
                "points" => $this->points,
                "forceOrder" => $this->forceOrder,
                "resourcesNum" => $this->resourcesNum,
                "resources" => $this->resources,
            )
        );
    }

    public function unserialize($data)
    {
        $unserialized = unserialize($data);
        $this->regex = $unserialized["regex"];
        $this->answer = $unserialized["answer"];
        $this->urlsNum = $unserialized["urlsNum"];
        $this->logo = $unserialized["logo"];
        $this->usrls = $unserialized["usrls"];
        $this->type = $unserialized["type"];
        $this->attemptsNumber = $unserialized["attemptsNumber"];
        $this->showAttempts = $unserialized["showAttempts"];
        $this->points = $unserialized["points"];
        $this->forceOrder = $unserialized["forceOrder"];
        $this->resourcesNum = $unserialized["resourcesNum"];
        $this->resources = $unserialized["resources"];
    }
}