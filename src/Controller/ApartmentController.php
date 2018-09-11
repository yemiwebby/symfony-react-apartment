<?php

namespace App\Controller;

use App\Entity\Apartment;
use App\Service\ImageUploader;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ApartmentController extends AbstractController
{
    protected $statusCode = 200;
    private $entityManager;
    private $apartmentRepository;
    private $imageUploader;

    public function __construct(EntityManagerInterface $entityManager, ImageUploader $imageUploader)
    {
        $this->entityManager = $entityManager;
        $this->apartmentRepository = $entityManager->getRepository('App:Apartment');
        $this->imageUploader = $imageUploader;
    }

    /**
     * @Route("/apartments", name="apartments" method="GET")
     */
    public function index()
    {
        $apartments = $this->apartmentRepository->findAllApartment();

        return $this->response($apartments);
//        return $this->render('apartment/index.html.twig', [
//            'controller_name' => 'ApartmentController',
//        ]);
    }

    public function createApartment(Request $request)
    {
        $request = $this->acceptJsonPayload($request);

        if (! $request) {
            return $this->responseWithError('Request not valid');
        }

        $apartment = new Apartment;
        $apartment->setTitle($request->get('title'));
        $apartment->setLikeCount(0);
        $apartment->setDescription($request->get('description'));
//        $apartment->setImageUrl($this->imageUploader->uploadImageToCloudinary($request->get('image')));
    }


    function response($data) {
        return new JsonResponse($data, $this->statusCode);
    }

    function responseWithError($errors) {
        $errorMsg = [
            'errors' => $errors
        ];
        return new JsonResponse($errorMsg, 422);
    }

    function acceptJsonPayload(Request $request)
    {
        $data = json_decode($request->getContent(), true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            return null;
        }

        if ($data === null) {
            return $request;
        }

        $request->request->replace($data);

        return $request;
    }
}
