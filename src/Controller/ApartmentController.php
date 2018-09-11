<?php

namespace App\Controller;

use App\Entity\Apartment;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class ApartmentController extends AbstractController
{
    private $entityManager;

    private $apartmentRepository;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
        $this->apartmentRepository = $entityManager->getRepository('App:Apartment');
    }

    /**
     * @Route("/apartments", name="apartments" method="GET")
     */
    public function index()
    {
        return $this->render('apartment/index.html.twig', [
            'controller_name' => 'ApartmentController',
        ]);
    }
}
