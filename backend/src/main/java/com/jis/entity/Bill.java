package com.jis.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "bills")
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String billID;

    private double amount;

    private Date generatedDate;

    @ManyToOne
    @JoinColumn(name = "lawyer_id")
    private User lawyer; // Fixed: Added for mappedBy in User

    public double calculateAmount() {
        return 100.0;
    }

    public boolean processPayment() {
        return true;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getBillID() { return billID; }
    public void setBillID(String billID) { this.billID = billID; }
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
    public Date getGeneratedDate() { return generatedDate; }
    public void setGeneratedDate(Date generatedDate) { this.generatedDate = generatedDate; }
    public User getLawyer() { return lawyer; }
    public void setLawyer(User lawyer) { this.lawyer = lawyer; }
}