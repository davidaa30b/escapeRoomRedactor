<?php


class Game implements Serializable
{
    private $id = 0;
    private $name = "";
    private $content = "";
    private $status = "";
    private $category = "";

    public function __construct($id, $name, $content, $status, $category)
    {
        $this->id = $id;
        $this->name = $name;
        $this->content = $content;
        $this->status = $status;
        $this->category = $category;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getName()
    {
        return $this->name;
    }
    public function getContent()
    {
        return $this->content;
    }

    public function getStatus()
    {
        return $this->status;
    }

    public function getCategory()
    {
        return $this->category;
    }

    public function serialize()
    {
        return serialize(
            array(
                "name" => $this->name,
                "content" => $this->content,
                "status" => $this->status,
                "category" => $this->category
            )
        );
    }

    public function unserialize($data)
    {
        $unserialized = unserialize($data);
        $this->name = $unserialized["name"];
        $this->content = $unserialized["content"];
        $this->status = $unserialized["status"];
        $this->category = $unserialized["category"];
    }
}