<?php


class User implements Serializable
{

    private $firstName = "";
    private $lastName = "";
    private $email = "";

    public function __construct($firstName, $lastName, $email)
    {
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->email = $email;
    }

    public function getFirstName()
    {
        return $this->firstName;
    }
    public function getLastName()
    {
        return $this->lastName;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function serialize()
    {
        return serialize(
            array(
                "firstName" => $this->firstName,
                "lastName" => $this->lastName,
                "email" => $this->email
            )
        );
    }

    public function unserialize($data)
    {
        $unserialized = unserialize($data);
        $this->firstName = $unserialized["firstName"];
        $this->lastName = $unserialized["lastName"];
        $this->email = $unserialized["email"];
    }
}