<?php

namespace Chamilo\InstallerBundle\Validator\Constraints;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

use Doctrine\DBAL\DriverManager;

class DatabaseConnectionValidator extends ConstraintValidator
{
    public function validate($value, Constraint $constraint)
    {
        $params = array(
            'host'     => $value['chamilo_installer_database_host'],
            'port'     => $value['chamilo_installer_database_port'],
            'dbname'   => $value['chamilo_installer_database_name'],
            'user'     => $value['chamilo_installer_database_user'],
            'password' => $value['chamilo_installer_database_password'],
            //'driver'   => $value['chamilo_installer_database_driver'],
            'driver'   => 'pdo_mysql',
            'charset'  => 'UTF8',
        );

        try {
            DriverManager::getConnection($params)->connect();
        } catch (\PDOException $e) {
            $this->context->addViolation($constraint->message, array('%name%' => $params['dbname']));
        }
    }
}
