<?php

namespace App\Repository;

use App\Entity\Apartment;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Apartment|null find($id, $lockMode = null, $lockVersion = null)
 * @method Apartment|null findOneBy(array $criteria, array $orderBy = null)
 * @method Apartment[]    findAll()
 * @method Apartment[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ApartmentRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Apartment::class);
    }

    public function fetch(Apartment $apartment) {
        return [
            'id' => (int) $apartment->getId(),
            'title' =>  (string) $apartment->getTitle(),
            'description' => (string) $apartment->getDescription(),
            'likeCount' =>  (int) $apartment->getLikeCount()
        ];
    }

    public function findAllApartment()
    {
        $apartments  = $this->findAll();
        $apartmentsArray = [];

        foreach ($apartments as $apartment) {
            $apartmentsArray [] = $this->fetch($apartment);
        }

        return $apartmentsArray;
    }

//    /**
//     * @return Apartment[] Returns an array of Apartment objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('a.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Apartment
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
