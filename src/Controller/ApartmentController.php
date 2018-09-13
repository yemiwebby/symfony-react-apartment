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

//    /**
//     * @Route("/apartments", name="apartments", method="GET")
//     */

    /**
     * @Route("/", name="default")
     */
    public function index()
    {
        return $this->render('default/index.html.twig', [
            'controller_name' => 'ApartmentController',
        ]);
    }

    /**
     * @Route("/apartments", name="apartments", methods="GET")
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function apartments()
    {
        $apartments = $this->apartmentRepository->modifyAllApartment();

        return $this->response($apartments);
    }

    /**
     * @Route("/apartments/create", methods="POST")
     */
    public function createApartment(Request $request)
    {
        dd($request->getContent());
        $request = $this->acceptJsonPayload($request);

//        dd('HEre');

        if (! $request) {
            return $this->responseWithError('Request not valid');
        }

        dd($request->get('image'));
        $apartment = new Apartment;
        $apartment->setTitle($request->get('title'));
        $apartment->setLikeCount(0);
        $apartment->setDescription($request->get('description'));
        $apartment->setPrice($request->get('price'));
        $apartment->setImageUrl($this->imageUploader->uploadImageToCloudinary($request->get('image')));
        $this->updateDatabase($apartment);

        return new JsonResponse($this->apartmentRepository->modify($apartment));
    }

    /**
     * @Route("/apartments/{id}/count", methods="POST")
     */
    public function increaseLikeCount($id)
    {
        $apartment = $this->apartmentRepository->find($id);
        if (! $apartment) {
            return new JsonResponse("Not found!", 404);
        }
        $apartment->setLikeCount($apartment->getLikeCount() + 1);
        $this->updateDatabase($apartment);

        return $this->response($apartment->getLikeCount());
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
//        dd($request->getContent());
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


    function updateDatabase($object) {
        $this->entityManager->persist($object);
        $this->entityManager->flush();
    }
}
