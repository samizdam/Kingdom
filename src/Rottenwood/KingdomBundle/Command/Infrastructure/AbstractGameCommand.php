<?php

namespace Rottenwood\KingdomBundle\Command\Infrastructure;

use Doctrine\ORM\EntityManager;
use Rottenwood\KingdomBundle\Entity\User;

class AbstractGameCommand implements GameCommandInterface {

    /** @var User */
    protected $user;
    /** @var string */
    protected $parameters;
    /** @var EntityManager */
    protected $entityManager;

    /**
     * @param User          $user
     * @param string        $parameters
     * @param EntityManager $entityManager
     */
    public function __construct(User $user, $parameters, $entityManager) {
        $this->user = $user;
        $this->parameters = $parameters;
        $this->entityManager = $entityManager;
    }

    /**
     * @return string
     */
    public function execute() {
        return '';
    }
}